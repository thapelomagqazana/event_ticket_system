/**
 * @jest-environment node
 */

const request = require("supertest");
const app = require("../src/app");

afterAll((done) => {
    // Close the server to release the open handle
    app.closeServer(() => {
      done();
    });
});

/**
 * Test the process of selecting and purchasing a ticket
 */
describe("Ticket Selection and Purchase", () => {
    /**
     * It should allow selecting and purchasing a ticket.
     */
    it("should allow selecting and purchasing a ticket", async () => {
        const response = await request(app)
        .post("/tickets/purchase")
        .send({ ticketType: 'general', quantity: 2, paymentMethod: 'sandbox' });

        // Assert that the response status is 200 (OK)
        expect(response.status).toBe(200);

        // Assert that the response body contains a confirmation code
        expect(response.body).toHaveProperty('confirmationCode');
    });
});