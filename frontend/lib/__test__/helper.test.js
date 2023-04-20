import { truncateString } from "../helper"

describe("truncateString", () => {
  test("truncate with more lenght than requesting", () => {
    let str = truncateString("More than number requesting", 10)
    expect(str).toBe("More than ...")
  })

  test("truncate with less lenght than requesting", () => {
    let str = truncateString("Less number", 20)
    expect(str).toBe("Less number")
  })

  test("truncate without number", () => {
    let str = truncateString("Without number")
    expect(str).toBe("Without number")
  })
})
