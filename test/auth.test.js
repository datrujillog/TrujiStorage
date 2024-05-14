import request from 'supertest';
import express from 'express';
import authRouter from '../src/routes/authRouter';

import AuthService from '../src/service/authService.js'; // Ajusta la ruta según la ubicación real de tu clase AuthService
import { compare } from '../src/libs/bcrypt.js';
import { createToken } from '../src/libs/jwt.js';


// Crea una instancia de Express y registra el enrutador de autenticación


// Define el objeto de usuario que se enviará en la solicitud
const results = {
    "id": 12,
    "name": "Diego",
    "email": "unox@example.com",
    "password": "$2b$10$VI/EQ/0gQjzNYf8WDThjwukFtqSxM/Qpj1tyAAzonQJXzprMJIvz.",
    "active": true,
    "createdAt": "2024-04-09T04:36:40.366Z"

};

// Mockear las dependencias externas
jest.mock('../src/libs/bcrypt.js', () => ({
    compare: jest.fn(),
}));

jest.mock('../src/libs/jwt.js', () => ({
    createToken: jest.fn(),
}));


describe('AuthService', () => {
    let authService;

    beforeEach(() => {
        authService = new AuthService();
    });

    describe('login', () => {
        it('should return user and token if login is successful', async () => {
            const mockUser = {
                email: 'test@example.com',
                password: 'password',
            };

            const mockUserFromDB = {
                email: 'test@example.com',
                password: 'hashedPassword',
                // Otros datos del usuario
            };

            const mockToken = 'mockToken';

            // Mockear el comportamiento de las dependencias externas
            compare.mockResolvedValue(true); // Simula una comparación exitosa de contraseñas
            createToken.mockResolvedValue(mockToken); // Simula la creación exitosa de un token

            // Simular el comportamiento del método getByEmail del UserRepository (superclase)
            authService.getByEmail = jest.fn().mockResolvedValue({ resulEmail: mockUserFromDB }); // Simula la obtención exitosa de un usuario

            // Llamar al método login
            const result = await authService.login(mockUser);

            // Verificar que se llame correctamente a compare y createToken
            expect(compare).toHaveBeenCalledWith(mockUser.password, mockUserFromDB.password);  // Verificar que compare se llamó con las contraseñas correctas
            expect(createToken).toHaveBeenCalledWith(mockUserFromDB);

            // Verificar que el resultado sea el esperado
            expect(result.success).toBe(true);
            expect(result.user).toEqual(mockUserFromDB);
            expect(result.token).toBe(mockToken);
        });

        // agregar caso si el email no existe 
        it('should return an error if the email does not exist', async () => {
            // Define el email que no existe en la base de datos
            const nonexistentEmail = 'nonexistent@example.com';

            // Configura el mock de getByEmail para que devuelva un objeto con resulEmail establecido en null
            authService.getByEmail = jest.fn().mockResolvedValue({ resulEmail: null });

            // Intenta realizar el inicio de sesión con el email inexistente
            try {
                await authService.login({ email: nonexistentEmail, password: 'password' });
                // Si el código llega aquí, el test fallará porque el método login debería arrojar un error
                expect(true).toBe(false); // Forzar falla del test si no se arroja ningún error
            } catch (error) {
                // Verifica que el error sea el esperado
                expect(error).toBeInstanceOf(Error);
                // expect(error.message).toBe();  //
                expect(error.message).toBe('User not found');
            }
        });

    });
});