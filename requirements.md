# react-invoice-app

**An accounting application take home challenge**

### Non-functional requirements:

- the application must be built in **typescript**
- it must have clear instructions on how to launch the app
- must be used at least one styling framework for example **styled-components**, **SASS** or other
- must be used **Redux** for state management
- must be used **react-router** for routing
- date picker input must be a custom or 3rd party component (simple HTML datetime input is not acceptable)
- at least one custom react hook must be used, created by your own
- custom client side form validation (not default HTML input validation attributes)
- react components should not re-render without any reason. Keep in mind performance and optimization
- feel free to use any libraries or 3rd party code as you see fit.
- submit code into your own private git repo (for example, GitHub private repositories is free)

##### Optional

- react context usage
- browser local storage can imitate database for the data persistent
- simulate api errors (invoice posting for example) and handle them on the client-side

### Functional requirements

We need to build an accounting application where the user can enter his or hers invoices.
An invoice is described by the following fields:

```
{
  "id": "An automatically generated GUID value",
  "title": "a string, containing a human friendly name for hte invoice",
  "description": "a longer string describing invoice in more detail",
  "lines": [
    {
      "product": "a string, containing a human friendly product name",
      "price": "product price, a numeric representation",
      "quatity": "numper bof products invoced, a numeric representation"
    }
  ],
  "timestamp": "date and time of the purchase"
}
```

Please implement the following:

- as a user i can create invoices
- as a user i can update an invoice and set and their detailed lines. Asume that the products are returned by the backend api in this format

```
[
  {
    "id": 1,
    "name": "apples",
    "price": 12,
    "isWeighed": true
  },
  {
    "id": 2,
    "name": "cinamon",
    "price": 8,
    "isWeighed": false
  },
  {
    "id": 3,
    "name": "sugar",
    "price": 20,
    "isWeighed": false
  },
  {
    "id": 4,
    "name": "chocolate milk",
    "price": 35,
    "isWeighed": false
  },
  {
    "id": 5,
    "name": "cheesecake",
    "price": 70,
    "isWeighed": true
  }
]
```

the property isWeighed defines if the product can have fractional quantity. If true, quantity can be set as `1.1`, `4.87`, `0,3333` and is arroximated to at most 4 digits

- as a user i can enter a date-range and get a list of all my purchases during this period and the total amount of money spent
- extract as much logic as possible into separate abstraction layer in order to be able to use it for management of other entities forms.
  Other entities will follow similar concepts - header fields and detail sub entities in array (for example Customer entity as Invoice and CustomerDocuments as InvoiceLines):

```
{
  "customerName": "nameExample",
  "customerId": "registerCode",
  "customerAddress": "address",
  "customerDocuments": [
    {
      "docName": "Sales Contract",
      "docDate": "2020-12-31",
      "validTill": "2021-06-30"
    },
    {
      "docName": "Certificate of Completed Work",
      "docDate": "2021-02-01",
      "validTill": null
    }
  ]
```
