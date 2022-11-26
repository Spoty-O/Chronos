class TestController {
    async test(req, res, next) {
        return res.json({ message: "ok" });
    }
}

module.exports = new TestController();
