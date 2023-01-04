import { WebAppInternals } from "meteor/webapp";
import assert from "assert";

describe("safari-version-parse-issue", function () {
  it("package.json has correct name", async function () {
    const { name } = await import("../package.json");
    assert.strictEqual(name, "safari-version-parse-issue");
  });

  if (Meteor.isClient) {
    it("client is not server", function () {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it("server is not client", function () {
      assert.strictEqual(Meteor.isClient, false);
    });

    describe("mobile_safari minor and patch versions are parsed correctly", function () {
      function getBrowser(ua) {
        return WebAppInternals.identifyBrowser(ua);
      }
      it("correct for 10_1", function () {
        const ua_10_1 = "Mozilla/5.0 (iPhone; CPU iPhone OS 10_1 like Mac OS X) AppleWebKit/602.2.14 (KHTML, like Gecko) Version/10.0 Mobile/14B72 Safari/602.1";
        const browser = getBrowser(ua_10_1);
        assert.strictEqual(browser, {
          name: "mobileSafari",
          major: 10,
          minor: 1,
          patch: 0
        });
      });
      it("correct for 10_2", function () {
        const ua_10_2 = "Mozilla/5.0 (iPhone; CPU iPhone OS 10_2 like Mac OS X) AppleWebKit/602.3.12 (KHTML, like Gecko) Version/10.0 Mobile/14C89 Safari/602.1";
        const browser = getBrowser(ua_10_2);
        assert.strictEqual(browser, {
          name: "mobileSafari",
          major: 10,
          minor: 2,
          patch: 0
        });
      });
      it("correct for 10_3_1", function () {
        const ua_10_3_1 = "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E8301 Safari/602.1";
        const browser = getBrowser(ua_10_3_1);
        assert.strictEqual(browser, {
          name: "mobileSafari",
          major: 10,
          minor: 3,
          patch: 1
        });
      });
    });
  }
});
