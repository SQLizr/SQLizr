// this is to declare global types that we can use everywhere
// without importing separate types-libraries in each file

import "@testing-library/react"
import "@testing-library/jest-dom"
import "@testing-library/jest-dom/extend-expect"

interface Element {
    style: CSSStyleDeclaration
}