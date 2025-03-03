import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from "../src/app/page";
import {describe, it} from "node:test";

describe('Page', () => {
    it('renders a heading', () => {
        render(<Home />)
        // find only hello world text
        expect(screen.getByText('Hello World!')).toBeInTheDocument()
    })
})