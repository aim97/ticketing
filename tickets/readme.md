# Tickets service

## routes

- **Create ticket**:
  - | route | **POST**`:/api/tickets/` |  
    |-|-|
    | **requires auth** | ✅ |  
    | **body** | `{ title: string, price: number}` |  
    | **reponse** | ✅`201`: created successfully <br /> ❌`400`: bad request <br /> 🔐`401`: Unauthorized |  
    | **reponse body** | `ticket` |
- **Update ticket**:
  - | route | **PATCH**`:/api/tickets/:id` |  
    |-|-|
    | **requires auth** | ✅ |  
    | **body** | `{ title: string, price: number}` |  
    | **reponse**|✅`200`: tickets <br /> ❌`400`: bad request <br /> 🔐`401`: Unauthorized **only author can update** <br /> ❌`404`: not found |
    | **reponse body** | `ticket` |
- **get all ticket**:
  - | route | **GET**`:/api/tickets/` |  
    |-|-|
    | **requires auth** | ❌ |  
    | **body** |  |  
    | **reponse** | ✅`200`: tickets |
    | **reponse body** | `[ticket]` |  
- **get certain ticket**:
  - | route | **GET**`:/api/tickets/:id` |  
    |-|-|
    | **requires auth** | ❌ |  
    | **body** |  |  
    | **reponse** | ✅`200`: ticket <br /> ❌`404`: not found |
    | **reponse body** | `ticket` |  
