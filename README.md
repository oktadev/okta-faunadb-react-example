# Create a Secure Serverless Application with FaunaDB

This repository shows you how to integrate [Fauna DB](https://fauna.com/) in a React application secured with Okta.  You will learn how to set up Okta to be an authentication provide and pass the token from Okta to Fauna, which Fauna can use to authenticate your user.  Please read [Create a Secure Serverless Application with FaunaDB][blog] to see how it was created.

**Prerequisites:**

- [Node.js](https://nodejs.org/en/)
- [Fauna Account](https://fauna.com/)
- [Okta CLI](https://cli.okta.com)
> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To run this example locally, run the following commands:

```bash
git clone https://github.com/nickolasfisher/Okta_FaunaDB.git
cd Okta_FaunaDB
```

### Create an OIDC Application in Okta

Create a free developer account with the following command using the [Okta CLI](https://cli.okta.com):

```shell
okta register
```
If you already have a developer account, use `okta login` to integrate it with the Okta CLI. 

Navigate to your Okta Admin Portal.

Click **Security** > **API** and then click **Add Authorization Server**.

Name your Authorization Service `FaunaDB`, set the audience to `Change Later`, set the description to `Server for Fauna DB`.

Return to the Okta CLI to create a client application in Okta with the following command:

```shell
okta apps create
```

You will be prompted to select the following options:
- Type of Application: **1: Web**
- Framework of Application: **Other**
- Redirect URI: `https://localhost:3000/authorization-code/callback`
- Post Logout Redirect URI: `https://localhost:3000`
- Authorization Server: *Select the Option that has your new FaunaDB Server*

The application configuration will be printed to `.okta.env`.

```dotenv
export OKTA_OAUTH2_ISSUER="{yourOktaDomain}/oauth2/{yourAuthorizationServiceId}"
export OKTA_OAUTH2_CLIENT_SECRET="{yourClientSecret}"
export OKTA_OAUTH2_CLIENT_ID="{yourClientId}"
```

Create a new file in your project folder called .env.  Copy the values to there

```dotenv
REACT_APP_OKTA_CLIENTID={yourClientId}
REACT_APP_OKTA_URL_BASE={yourOktaDomain}
REACT_APP_OKTA_AUTHORIZATION_SERVER_ID={yourAuthorizationServiceId}
REACT_APP_OKTA_APP_BASE_URL=http://localhost:3000
```

Use `npm run start` to run the application.

### Setup FaunaDB

Log in to your Fauna Account

Click **Create Database**

Name it *Products*
Select *Classic* for Region Group
Select *Use Demo Data*

Once the database sets up, navigate to the *Security* tab and select the *Providers* tab on the *Security* screen.

Click **New Access Provider**

Name the Access Provider *Okta*
Copy the Audience -> Paste this in the *Audience* Field of your authorization server in Okta
Retrieve your *Metadata URI* from the Okta authorization server page and paste it in the JWKS endpoint
Copy your *Issuer* from Okta to FaunaDB
Under *Select a Role* select *customer*
Click **Save**

### Test your Application

In your application use the command `npm run start` to run your application.

Login to your Okta account and you should see the list of Products from Fauna

## Links

This example uses the following open source libraries from Okta:

* [Okta with NodeJs](https://developer.okta.com/code/nodejs/)
* [Okta with React](https://developer.okta.com/code/react/)
* [Okta CLI](https://github.com/okta/okta-cli)

## Help

Please post any questions as comments on the [blog post][blog], or visit our [Okta Developer Forums](https://devforum.okta.com/).

## License

Apache 2.0, see [LICENSE](LICENSE).

[blog]: https://developer.okta.com/blog/2021/xyz
