# Form Builder

## Part 1

For part 1 I created a json file which will contain the information for the form.

```json
[
  {
    "id": 1,
    "question": "What is the name of your business?",
    "required": true,
    "type": "text",
    "range": [1, 2000]
  },
  {
    "id": 2,
    "question": "What is the name of the role?",
    "required": true,
    "type": "select",
    "options": [
      {
        "id": 1,
        "name": "Customer Success"
      },
      {
        "id": 2,
        "name": "Fullstack Engineer"
      },
      {
        "id": 3,
        "name": "Product Manager"
      }
    ]
  },
  {
    "id": 3,
    "question": "What is your primary business?",
    "required": true,
    "type": "select",
    "options": [
      {
        "id": 1,
        "name": "Accounting"
      },
      {
        "id": 2,
        "name": "Software development"
      },
      {
        "id": 3,
        "name": "Landscaping"
      }
    ]
  },
  {
    "id": 4,
    "question": "Is a technical background required?",
    "required": true,
    "type": "radio",
    "options": [
      {
        "id": 1,
        "value": "Yes"
      },
      {
        "id": 2,
        "value": "No"
      }
    ],
    "render": [
      {
        "rule": [[2, 2]]
      },
      {
        "rule": [[2, 3], [3, 2]]
      }
    ]
  }
]
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.