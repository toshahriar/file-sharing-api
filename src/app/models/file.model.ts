import { DataTypes, Model, Sequelize } from 'sequelize';

export class File extends Model {
    static initialize(sequelize: Sequelize): void {
        File.init(
            {
                id: {
                    type: DataTypes.UUID,
                    primaryKey: true,
                    // @ts-ignore
                    defaultValue: Sequelize.UUIDV4,
                },
                fileName: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                path: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                size: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                },
                mimeType: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                privateKey: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                publicKey: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                signature: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                ipAddress: {
                    type: DataTypes.STRING(45),
                    allowNull: false,
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
            },
            {
                sequelize,
                modelName: 'files',
                timestamps: false,
                underscored: true,
            }
        );
    }
}
