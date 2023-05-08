import {screen, render} from "@testing-library/react"
import { WeatherResult } from "./WeatherResult"

describe('WeatherResult',()=>{
    test('renders properly',()=>{
        render(<WeatherResult/>)
        const titleElement = screen.getByRole('heading',{name: `Today's Weather`})
        expect(titleElement).toBeInTheDocument()
    })

    test('renders no result to display when no API is called',async()=>{
        render(<WeatherResult/>)
        const defaultWeather = await screen.findByText("No result to display")
        expect(defaultWeather).toBeInTheDocument()
    })
})