# TriggerFlow

TriggerFlow is a **visual workflow automation platform** that lets users build **trigger–action pipelines** to automate tasks such as crypto trading and email notifications.

Users design workflows using a **node-based editor**, connect triggers to actions, and the system automatically executes them when conditions are met.

---

## Features

- Visual Workflow Builder using **React Flow**
- **Time Trigger** – execute workflows after a delay
- **Price Trigger** – run workflows when crypto reaches a target price
- **Email Automation** via **Resend API**
- **Automated Crypto Trading** using **Backpack Exchange API**
- **Background Executor Service** that continuously evaluates triggers
- **Execution Tracking** *(Pending / Success / Failed)*

---

## How It Works

1. Create a workflow using the visual editor.
2. Add a **trigger node** *(Time or Price)*.
3. Connect **action nodes** *(Send Email or Execute Trade)*.
4. Publish the workflow.

The executor service continuously monitors triggers and runs the workflow automatically when conditions are met.

---

## Tech Stack

### Frontend
- React
- TypeScript
- React Flow
- TailwindCSS

### Backend
- Node.js
- Express

### Database
- MongoDB

### External APIs
- Backpack Exchange SDK
- Binance API
- Resend Email API

### Monorepo
- TurboRepo

---

## Disclaimer

Automated trading involves financial risk. Users must provide their own **Backpack API Key and Secret** to execute trades.

This project is intended for **educational and experimental purposes**.
