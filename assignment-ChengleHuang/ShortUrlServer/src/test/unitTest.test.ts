import { expect } from "chai";
import { HostDomain, myUtil } from "../myUtil";
describe("测试生成短链接的函数", function () {
  before(function () {
    console.log("开始测试生成短链接的函数");
  });
  it("genShortUrl(0)仅返回域名", function () {
    expect(myUtil.genShortUrl(0)).to.equal(HostDomain);
  });
  it("genShortUrl(-1)仅返回域名", function () {
    expect(myUtil.genShortUrl(-1)).to.equal(HostDomain);
  });
  it("genShortUrl(0.33)返回1个字符的短域名", function () {
    expect(myUtil.genShortUrl(0.33)).to.have.lengthOf(
      HostDomain.length + Math.ceil(0.33)
    );
  });
  it("genShortUrl(10)返回10个字符的短域名", function () {
    expect(myUtil.genShortUrl(10))
      .to.includes(HostDomain)
      .with.lengthOf(HostDomain.length + Math.ceil(10));
  });
});

describe("测试校验网址的函数", function () {
  before(function () {
    console.log("开始测试校验网址的函数");
  });
  it("校验http://123.com/11122?dfsdfds", function () {
    expect(myUtil.validateUrl("http://123.com/11122?dfsdfds")).equal(true);
  });
  it("校验123.com/11122?dfsdfds", function () {
    expect(myUtil.validateUrl("http://123.com/11122?dfsdfds")).equal(true);
  });
  it("校验123.com", function () {
    expect(myUtil.validateUrl("123.com")).equal(true);
  });
  it("校验abc//:abc.com", function () {
    expect(myUtil.validateUrl(":abc.com")).equal(false);
  });
  it("校验//:abc.com", function () {
    expect(myUtil.validateUrl(":abc.com")).equal(false);
  });
  it("校验:abc.com", function () {
    expect(myUtil.validateUrl(":abc.com")).equal(false);
  });
  it("校验abc", function () {
    expect(myUtil.validateUrl("abc")).equal(false);
  });
  it("校验空字符串", function () {
    expect(myUtil.validateUrl("")).equal(false);
  });
});
