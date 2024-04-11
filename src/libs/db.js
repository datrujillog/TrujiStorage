// src/libs/db.js
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';

dotenv.config({
    path: './.env.development'
});

// No inicializar PrismaClient aquí
let client;

export default function getClient() {
    if (!client) {
        client = new PrismaClient()
    }
    return client;
}
