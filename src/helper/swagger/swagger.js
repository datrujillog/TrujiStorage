

const swaggerAPi = {
  "openapi": "3.1.0",
  "info": {
    "title": "API REST",
    "description": "API desarrollada en NodeJS, Express y MongoDB",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "http://localhost:5000"
    }
  ],




  "tags": [
    {
      "name": "Auth",
      "description": "Endpoints de Auth"
    }
  ],

  "paths": {

    "/api/v1/auth/signup": {
      "post": {
        "summary": "auth signup",
        "tags": ["Auth"],
        "description": "auth signup",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/auth signup"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "auth created successfully"
          },
          "400": {
            "description": "Error in the shipping data"
          },
          "500": {
            "description": "Error in the server"
          }
        }
      }
    },

    
    

  
// ducumentacion de los productos

    "/api/v1/auth/login": {
      "post": {
        "summary": "auth login",
        "tags": ["Auth"],
        "description": "auth login",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/auth login"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "login updated successfully"
          },
          "400": {
            "description": "Error in the shipping data"
          },
          "500": {
            "description": "Error in the server"
          }
        }
      }
    },

    "/api/v1/product/delete/{id}": {
      "delete": {
        "summary": "delete product",
        "tags": ["Product"],
        "description": "delete product",
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "schema": {
              "type": "string",
              "example": "e7990dd3-8aac-476a-810a-3a00753f010b"
            },
            "required": true,
            "description": "id del producto"
          }
        ],

        "responses": {
          "200": {
            "description": "product deleted successfully"
          },
          "400": {
            "description": "Error in the shipping data"
          },
          "500": {
            "description": "Error in the server"
          }
        }
      }
    },
    "/api/v1/product/scores": {
      "get": {
        "summary": "scores product",
        "tags": ["Product"],
        "description": "scores product",

        "responses": {
          "200": {
            "description": "Product get successfully"
          },
          "400": {
            "description": "Error in the shipping data"
          },
          "500": {
            "description": "Error in the server"
          }
        }
      }
    },
    "/api/v1/product/stats": {
      "get": {
        "summary": "stats product",
        "tags": ["Product"],
        "description": "See the statistics of your products",

        "responses": {
          "200": {
            "description": "Product get successfully"
          },
          "400": {
            "description": "Error in the shipping data"
          },
          "500": {
            "description": "Error in the server"
          }
        }
      }
    },




    "/api/v1/inventory": {
      "get": {
        "summary": "inventory",
        "tags": ["inventory"],
        "description": "inventory",

        "responses": {
          "200": {
            "description": "Inventory get successfully"
          },
          "400": {
            "description": "Error in the shipping data"
          },
          "500": {
            "description": "Error in the server"
          }
        }
      }
    },

    "/api/v1/inventory/create": {
      "post": {
        "summary": "create Inventory",
        "tags": ["inventory"],
        "description": "create Inventory",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Inventory post"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Inventory created successfully"
          },
          "400": {
            "description": "Error in the shipping data"
          },
          "500": {
            "description": "Error in the server"
          }
        }
      }
    },


    "/api/v1/product/sell/{id}": {
      "post": {
        "summary": "se crea ventas",
        "tags": ["Sales"],
        "description": "se crea ventas",
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "schema": {
              "type": "string",
              "example": "e7990dd3-8aac-476a-810a-3a00753f010b"
            },
            "required": true,
            "description": "id del producto"
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Sales post"
              }
            }
          }
        },

        "responses": {
          "200": {
            "description": "Sale get successfully"
          },
          "400": {
            "description": "Error in the shipping data"
          },
          "500": {
            "description": "Error in the server"
          }
        }
      }
    },
    "/api/v1/sale/best-clients": {
      "get": {
        "summary": "best clients",
        "tags": ["Sales"],
        "description": "best clients",

        "responses": {
          "200": {
            "description": "Sales get successfully"
          },
          "400": {
            "description": "Error in the shipping data"
          },
          "500": {
            "description": "Error in the server"
          }
        }
      }
    },
    "/api/v1/sale/operators/time-delivery": {
      "post": {
        "summary": "Sales post time-delivery",
        "tags": ["Sales"],
        "description": "Manage the delivery times of your products by your operators",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Sales post time-delivery"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Sales created successfully"
          },
          "400": {
            "description": "Error in the shipping data"
          },
          "500": {
            "description": "Error in the server"
          }
        }
      }
    },


    "/api/v1/client/create": {
      "post": {
        "summary": "create client",
        "tags": ["Client"],
        "description": "create client",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/client post"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "client created successfully"
          },
          "400": {
            "description": "Error in the shipping data"
          },
          "500": {
            "description": "Error in the server"
          }
        }
      }
    }

  },


  // Shemas

  "components": {
    "schemas": {
      "auth signup": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "minLength": 2,
            "maxLength": 20,
            "example": "Diego"
          },
          "lastName": {
            "type": "string",
            "minLength": 2,
            "maxLength": 20,
            "example": "Trujillo"
          },
          "email": {
            "type": "string",
            "format": "email",
            "example": "example@example.com"
          },
          "password": {
            "type": "string",
            "minLength": 6,
            "maxLength": 20,
            "example": "123456"
          },
          "phone":{
            "type": "string",
            "example": "123456789"
          },
          "NameBusiness":{
            "type": "string",
            "example": "TrujiStudios"
          },
          "tipoNegocio":{
            "type": "string",
            "example": "ropa"
          },         
          
        },
        "required": [
          "name",
          "lastName",
          "email",
          "password",
        ]
      },

      "auth login": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string",
            "format": "email",
            "example": "example@example.com"
          },
          "password": {
            "type": "string",
            "minLength": 6,
            "maxLength": 20,
            "example": "123456"
          }
        },
        "required": [
          "email",
          "password",
        ]
      },

      // Termina aqui el post de auth signup


      "product delete": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "minLength": 2,
            "maxLength": 20,
            "example": "camisa"
          },
          "description": {
            "type": "string",
            "minLength": 2,
            "maxLength": 20,
            "example": "camisa de algodon"
          },
          "punctuation": {
            "type": "integer",
            "example": 5
          },
          "creationDate": {
            "type": "string",
            "format": "date"
          },
          "updateDate": {
            "type": "string",
            "format": "date"
          }
        },
        "required": [
          "name",
          "description",
          "punctuation",
          "creationDate",
          "updateDate"
        ]
      },


      "Inventory get": {
        "type": "object",
        "properties": {


        },
        "required": [

        ]
      },
      "Inventory post": {
        "type": "object",
        "properties": {
          "productId": {
            "type": "string",
            "example": "e7990dd3-8aac-476a-810a-3a00753f010b"
          },
          "stock": {
            "type": "integer",
            "example": 5
          }

        },
        "required": [
          "productId",
          "stock"
        ]
      },


      "Sales post": {
        "type": "object",
        "properties": {
          "stock": {
            "type": "integer",
            "example": 1
          }

        },
        "required": [
          "stock"
        ]
      },
      "Sales Get": {
        "type": "object",
        "properties": {
          "stock": {
            "type": "integer",
            "example": 1
          }

        },
        "required": [
          "stock"
        ]
      },
      "Sales post time-delivery": {
        "type": "object",
        "properties": {
          "operatorId": {
            "type": "string",
            "example": "e7990dd3-8aac-476a-810a-3a00753f010b"
          },
          "saleId": {
            "type": "string",
            "example": "e7990dd3-8aac-476a-810a-3a00753f010b"
          },
          "deliveryTime": {
            "type": "string",
            "example": 4.5
          }

        },
        "required": [
          "operatorId",
          "saleId",
          "deliveryTime"
        ]
      },


      "client post": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "example": "example"
          },
          "address": {
            "type": "string",
            "example": "calle 5"
          },
          "email": {
            "type": "string",
            "example": "example@example.com"
          },
          "phone": {
            "type": "string",
            "example": "123456789"
          }
        },
        "required": [
          "name",
          "address",
          "email",
          "phone"
        ]
      }
    }
  }
}


export default swaggerAPi;