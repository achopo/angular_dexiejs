# angular_dexiejs

Global Architecture

Models → represent tables (UML)

Services → business logic + Dexie CRUD

Components → UI (list, add , delete ...)

src/app/
│
├── models/
│   ├── client.model.ts
│   ├── product.model.ts
│   ├── facture.model.ts
│   └── facture-product.model.ts
│
├── services/
│   ├── db.service.ts          (Dexie config)
│   ├── client.service.ts
│   ├── product.service.ts
│   └── facture.service.ts
│
├── components/
│   ├── clients/
│   ├── products/
│   └── factures/
│
└── app.module.ts
