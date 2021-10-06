import React from "react";
import renderer from "react-test-renderer"
import { render } from "@testing-library/react";
import App from "./App";

describe("testing snapshot", () => {

  test("snapshot for App component", () => {
    /* converts the code inside of the App component to JSON format 
    and is stored as a snapshot inside the project directory */
    const renderedComponent = renderer.create(<App />).toJSON()
    expect(renderedComponent).toMatchSnapshot()
  })

})

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () =>
			Promise.resolve({
				name: "Johannesburg",
				country: "ZA",
			}),
	})
);

describe("App", () => {
	it("loads Johannesburg weather", () => {
		const { container } = render(<App />);
		expect(container.innerHTML).toMatch("Johannesburg");
	});
});

/* References: 

https://www.youtube.com/watch?v=qOaGoujjc3M

https://testing-library.com/docs/react-testing-library/intro/

https://jestjs.io/docs/asynchronous

https://www.youtube.com/watch?time_continue=64&v=yTZ-txdrHdY&feature=emb_title

https://api.openweathermap.org/data/2.5/weather?q=Johannesburg&appid=ed11dcfaa8049f2c5c3c5985abd88e40

*/
