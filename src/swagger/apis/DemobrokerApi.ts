/* tslint:disable */
/* eslint-disable */
/**
 * brokerize
 * The brokerize API allows clients to implement multi-brokerage easily with a unified interface.  # user accounts & temporary guest sessions  Users either have their own account at brokerize or create an ephemeral anonymous account while they use it. In the latter case, all data is deleted automatically when the session is ended. If users decide to create a proper account, they can log in to brokerize any time with their credentials and keep their data stored as long as they wish.  ![](/docs/diagrams/account.svg)  # connecting brokers and synchronizing data to brokerize  Users connect their brokerage accounts from either the official brokerize UI or from an app\'s interface using their broker credentials. To find out which brokers can be used for logging in, the [GetBrokers](#operation/GetBrokers) endpoint must be used. An end user can add a login by calling [AddSession](#operation/AddSession). Note that brokerize _never_ saves the login credentials, but only tokens / session ids that are issued by the brokers. Those are discarded as soon as the user logs out from the broker using [LogoutSession](#operation/LogoutSession).  As soon as users have connected one or more broker sessions, those sessions are synced into their user account. This means that the list of portfolios, positions and orders are stored in the brokerize database. All synchronized portfolios and their contents are accessible using the portfolio operations (e.g. [GetPortfolios](#operation/GetPortfolios), [GetPortfolioOrders](#operation/GetPortfolioOrders) etc.). Even after the user disconnects a session (or it times out at the broker etc.), the data remains available until actively deleted by the user ([DeletePortfolio](#operation/DeletePortfolio)). This means that users can easily look at the last known state of each portfolio without needing to log in. As soon as they log in again via [AddSession](#operation/AddSession), the data is updated again (i.e. the synchronized portfolio gets connected to an \"online session\" again).  Data is automatically synchronized in the background, but clients can also request a sync using [TriggerSessionSync](#operation/TriggerSessionSync).  ![](/docs/diagrams/session-lifecycle.svg)  # performing actions in portfolios  Actions can be performed in portfolios that have online sessions.  In order to figure out how actions can be authorized, the [GetAuthInfo](#operation/GetAuthInfo) must be used. If a _Session TAN_ is active, actions can be executed right away without further authorization. If not, depending on the selected `AuthMethod`s `flow` property, a challenge has to be created before the operation can actually be executed. For example, this can be an mTAN that is sent to the user or a QR code users have to scan with their smartphone to retrieve a TAN. Find our whether challenges are required in the documentation of [GetAuthInfo](#operation/GetAuthInfo).  The following actions are implemented:  -   Session TAN handling (for performing other actions in portfolios without further per-case authorization)     -   [CreateSessionTanChallenge](#operation/CreateSessionTanChallenge) to request a challenge for s TAN activation.     -   [EnableSessionTan](#operation/EnableSessionTan) to enable the session TAN.     -   [EndSessionTan](#operation/EndSessionTan) to end the session TAN. -   Create a trade     -   [PrepareTrade](#operation/PrepareTrade) to figure out how a given security can be traded in a portfolio.     -   [CreateTradeChallenge](#operation/CreateTradeChallenge) to (for example) request a TAN for a trade.     -   [CreateTrade](#operation/CreateTrade) to perform the trade. -   Edit an order     -   [CreateChangeOrderChallenge](#operation/CreateChangeOrderChallenge) to request a challenge for an order change.     -   [ChangeOrder](#operation/ChangeOrder) to change an order. -   Cancel an order     -   [CreateCancelOrderChallenge](#operation/CreateCancelOrderChallenge) to request a Challenge for an order cancellation.     -   [CancelOrder](#operation/CancelOrder) to cancel an order.  # rate limits  Currently a rate limit of 100 requests per 10 seconds per client/userId combination is implemented for all endpoints. Clients should implement ways to deal with the http `429` status code and can inspect the `Retry-After` header to implement appropriate waiting behavior. The rate limits will be refined in the future.  | `flow`               | requires challenge? | Description                                                                                                                                                                                                          | | -------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | | `TAN`                | no                  | the simplest flow: no challenge is required to perform the operation. the TAN is simply sent as parameter `tan` (_not yet implemented_)                                                                              | | `CHALLENGE_RESPONSE` | yes                 | a challenge must be created using the `createXYZChallenge` operations and the challenge must be presented to the user. The user can then execute the action using the `challengeId` and `challengeResponse` rameters | | `DECOUPLED`          | no                  | the operation is executed without any TAN, but returns a `decoupledOperationId` which can be used to read the action\'s status. Users will authorize the action in another frontend (usually in their broker\'s app)   | 
 *
 * The version of the OpenAPI document: 0.0.1-preview
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    InlineResponse2001,
    InlineResponse2001FromJSON,
    InlineResponse2001ToJSON,
    InlineResponse2002,
    InlineResponse2002FromJSON,
    InlineResponse2002ToJSON,
    InlineResponse2003,
    InlineResponse2003FromJSON,
    InlineResponse2003ToJSON,
} from '../models';

export interface DeleteDemoAccountRequest {
    accountId: string;
}

/**
 * 
 */
export class DemobrokerApi extends runtime.BaseAPI {

    /**
     * Create an account at the demo broker for the logged-in user. The account will have a default set of two empty portfolios.  The account as well as the two portfolios have a randomly generated name.  To log into an account, use the account\'s generated name as username (Account name) in `AddSession`. - with the password `42`, the login will succeed immediately - with the password `1337`, a challenge will be returned which must be completed by using `addSessionCompleteChallenge` (with a challengeResponse `42`) - other passwords will not allow to log in  The demo broker implements the following pre-defined trade behaviors, so that different flows can be tested: - ISIN US0378331005 (Apple):   - market buy order is executed after 10 seconds by the backend at a random quote   - stop buy order stays open forever (can be used for testing cancellation) - ISIN LU0378438732 (a DAX ETF)   - orders are rejected with code `ORDER_REJECTED` immediately - ISIN US4180561072 (Hasbro)   - only quote orders on one exchange are supported   - the quotes are valid for 45 seconds   - quote value is always `42`   - the order gets executed immediately - ISIN US98980L1017 (Zoom)   - only market orders (both buy and sell) are suppored on one exchange   - orders are executed immediately at a random quote   - order creation requires the user to accept a hint (i.e. first try will result in a `MUST_ACCEPT_HINT` error) - all other orders will be canceled after 3 seconds
     */
    async createDemoAccountRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<InlineResponse2002>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/demo/accounts`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse2002FromJSON(jsonValue));
    }

    /**
     * Create an account at the demo broker for the logged-in user. The account will have a default set of two empty portfolios.  The account as well as the two portfolios have a randomly generated name.  To log into an account, use the account\'s generated name as username (Account name) in `AddSession`. - with the password `42`, the login will succeed immediately - with the password `1337`, a challenge will be returned which must be completed by using `addSessionCompleteChallenge` (with a challengeResponse `42`) - other passwords will not allow to log in  The demo broker implements the following pre-defined trade behaviors, so that different flows can be tested: - ISIN US0378331005 (Apple):   - market buy order is executed after 10 seconds by the backend at a random quote   - stop buy order stays open forever (can be used for testing cancellation) - ISIN LU0378438732 (a DAX ETF)   - orders are rejected with code `ORDER_REJECTED` immediately - ISIN US4180561072 (Hasbro)   - only quote orders on one exchange are supported   - the quotes are valid for 45 seconds   - quote value is always `42`   - the order gets executed immediately - ISIN US98980L1017 (Zoom)   - only market orders (both buy and sell) are suppored on one exchange   - orders are executed immediately at a random quote   - order creation requires the user to accept a hint (i.e. first try will result in a `MUST_ACCEPT_HINT` error) - all other orders will be canceled after 3 seconds
     */
    async createDemoAccount(initOverrides?: RequestInit): Promise<InlineResponse2002> {
        const response = await this.createDemoAccountRaw(initOverrides);
        return await response.value();
    }

    /**
     * Delete the given demo account and all data (demo portfolios and the related orders) *permanently*.
     */
    async deleteDemoAccountRaw(requestParameters: DeleteDemoAccountRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<InlineResponse2003>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling deleteDemoAccount.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/demo/accounts/{accountId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse2003FromJSON(jsonValue));
    }

    /**
     * Delete the given demo account and all data (demo portfolios and the related orders) *permanently*.
     */
    async deleteDemoAccount(requestParameters: DeleteDemoAccountRequest, initOverrides?: RequestInit): Promise<InlineResponse2003> {
        const response = await this.deleteDemoAccountRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List all demo accounts that the user has in her account. The account name can be used as the login username in the demo broker login process.
     */
    async getDemoAccountsRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<InlineResponse2001>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-access-token"] = this.configuration.apiKey("x-access-token"); // idToken authentication
        }

        const response = await this.request({
            path: `/demo/accounts`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse2001FromJSON(jsonValue));
    }

    /**
     * List all demo accounts that the user has in her account. The account name can be used as the login username in the demo broker login process.
     */
    async getDemoAccounts(initOverrides?: RequestInit): Promise<InlineResponse2001> {
        const response = await this.getDemoAccountsRaw(initOverrides);
        return await response.value();
    }

}
