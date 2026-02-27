# 📊 QueueMaster: Interactive Queueing Theory Simulator

**QueueMaster** is a powerful web-based analytical tool designed to simulate and analyze stochastic arrival and service processes. Built with **Next.js**, it allows users to model complex queueing systems, visualize performance metrics, and make data-driven decisions through scenario comparison.

---

## 🚀 Live Demo
Experience the simulator live here:  
**[🔗 View Live Deployment](INSERT_YOUR_DEPLOYMENT_LINK_HERE)**

---

## ✨ Key Features

* **Dynamic Scenario Modeling:** Input parameters like Arrival Rate ($\lambda$), Service Rate ($\mu$), and Number of Servers ($s$) to see real-time system behavior.
* **Persistent Storage:** Automatically saves your simulations to `localStorage`, allowing you to revisit your data anytime without a backend.
* **Side-by-Side Comparison:** Select multiple scenarios to compare wait times, utilization rates, and queue lengths in a dedicated comparison view.
* **Intelligent Visualization:** * **Utilization Bars:** Color-coded progress bars that shift from green to red as system stress increases.
    * **Infinite Scrolling:** Smooth UI performance when managing a large library of saved scenarios.
* **Fully Responsive:** A clean, modern dashboard optimized for both desktop and mobile devices using **Tailwind CSS**.

---

## 🛠️ Technical Stack

* **Framework:** [Next.js 14/15](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict type safety for mathematical results)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **State Management:** React Hooks (`useState`, `useEffect`) with synchronized Client-side storage.

---

## 📐 Mathematical Foundation

The application calculates core performance measures based on standard **Queueing Theory** models (e.g., $M/M/s$):

* **System Utilization ($\rho$):** $$\rho = \frac{\lambda}{s \cdot \mu}$$
    *Where $\lambda$ is the arrival rate, $\mu$ is the service rate, and $s$ is the number of servers.*
* **Average Wait Time ($W_q$):** The expected time a customer spends waiting in the queue before service begins.

---

   ```bash
   git clone [https://github.com/your-username/queuemaster.git](https://github.com/your-username/queuemaster.git)
