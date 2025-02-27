import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_QPVHHPJbg",
    ClientId: "5vbl0me462jlpafj7p2fjoktv7"
}

export default new CognitoUserPool(poolData);