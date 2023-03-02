import dotenv from "dotenv";
dotenv.config();
const config = {
    graphqlUrl: process.env.GRAPHQL_URL,
    tableName: process.env.TABLE_NAME,
};
export default config;
