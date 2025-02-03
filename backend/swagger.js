const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MNP API Documentation',
            version: '1.0.0',
            description: 'API documentation for MNP (Management and Planning) application',
            contact: {
                name: 'API Support',
                email: 'support@mnp.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:5005/',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                Error: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'fail'
                        },
                        message: {
                            type: 'string'
                        }
                    }
                },
                Success: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'success'
                        },
                        data: {
                            type: 'object'
                        }
                    }
                }
            },
            responses: {
                UnauthorizedError: {
                    description: 'Access token is missing or invalid',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                },
                NotFoundError: {
                    description: 'The requested resource was not found',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                },
                ValidationError: {
                    description: 'Invalid input data',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                }
            }
        },
        security: [{
            bearerAuth: []
        }],
        tags: [
            { name: 'Auth', description: 'Authentication endpoints' },
            { name: 'Users', description: 'User management endpoints' },
            { name: 'Articles', description: 'Article management endpoints' },
            { name: 'Categories', description: 'Category management endpoints' },
            { name: 'Districts', description: 'District management endpoints' },
            { name: 'District Funds', description: 'District funds management endpoints' },
            { name: 'Beneficiaries', description: 'Beneficiary management endpoints' },
            { name: 'Beneficiary Types', description: 'Beneficiary type management endpoints' },
            { name: 'Beneficiary Lists', description: 'Beneficiary list management endpoints' },
            { name: 'Suppliers', description: 'Supplier management endpoints' },
            { name: 'Supplier Payments', description: 'Supplier payment management endpoints' },
            { name: 'Article Orders', description: 'Article order management endpoints' },
            { name: 'Years', description: 'Year management endpoints' },
            { name: 'Reports', description: 'Report generation endpoints' }
        ]
    },
    apis: ['./routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);
module.exports = specs;