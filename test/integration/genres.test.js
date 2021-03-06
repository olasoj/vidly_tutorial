const request = require("supertest")
const {
    Genre
} = require("../../model/genre")
let server

describe("/api/genres", () => {
    beforeEach(() => {
        server = require("../../index")
    })
    afterEach(async () => {
        server.close();
        await Genre.remove({})
    })

    describe("GET /", () => {
        it("should return all genres", async () => {
            //To populate the database
            await Genre.collection.insertMany([{
                name: 'genre1'
            }, {
                name: 'genre2'
            }])

            const res = await request(server).get("/api/genres")
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
        })
    })

    describe("GET /:id", () => {
        it("should return a 404 error", async () => {
            const res = await request(server).get("/api/genres/1")
            expect(res.status).toBe(404);
        })

        it("should return a genres", async () => {
            //To populate the database
            const genre = new Genre({
                name: 'genre1'
            })
            await genre.save();

            const res = await request(server).get("/api/genres/" + genre._id)
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);

        })
    })
})