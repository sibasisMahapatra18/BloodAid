---

# 🩸 **BloodAid**

**BloodAid** is a full-stack Java Spring Boot application designed to serve as a centralized **blood donation platform**. It connects **donors**, **recipients**, and **blood banks**, providing tools to manage donor databases, blood requests, inventory, and donation drives — all with the goal of saving lives more efficiently.

---

## 🎯 **Key Features**

* 🚑 **User Registration** – For both donors and hospitals.
* 🩸 **Blood Inventory Management** – Admins and blood banks can update and monitor stock.
* 📥 **Blood Request Portal** – Request specific blood types easily.
* 🔍 **Smart Search & Match Engine** – Locate compatible donors or the nearest blood banks.
* 🗓️ **Donation Drive Scheduling** – Plan and organize blood donation events.
* 📊 **Admin Dashboard** – Control panel to track requests, manage stock, and oversee system operations.

---

## 🧰 **Tech Stack**

| Layer      | Technology                                          |
| ---------- | --------------------------------------------------- |
| Backend    | Java 23, Spring Boot                                |
| Frontend   | HTML, CSS, JavaScript *(Thymeleaf or JSP optional)* |
| Database   | MySQL                                               |
| Security   | Spring Security                                     |
| Build Tool | Maven                                               |
| Testing    | Postman                                             |

---

## ⚙️ **Getting Started**

### 🔧 Prerequisites

Make sure you have the following installed:

* Java 23+
* Maven
* MySQL
* IDE (IntelliJ IDEA / Eclipse / VSCode)

---

### 🚀 Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/sibasisMahapatra18/BloodAid.git
   cd BloodAid
   ```

2. **Configure the Database**

   Edit `src/main/resources/application.properties` with your MySQL credentials:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/bloodaid
   spring.datasource.username=YOUR_USERNAME
   spring.datasource.password=YOUR_PASSWORD
   spring.jpa.hibernate.ddl-auto=update
   ```

3. **Build and Run**

   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

4. **Access the App**
   Open your browser at:

   ```
   http://localhost:8090/
   ```

---

## 📁 **Project Structure**

```bash
BloodAid/
├── src/
│   ├── main/
│   │   ├── java/com/bloodaid/
│   │   │   ├── controller/
│   │   │   ├── model/
│   │   │   ├── repository/
│   │   │   ├── service/
│   │   │   └── BloodAidApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── templates/
├── pom.xml
└── README.md
```

---

## 👥 **User Roles**

| Role                 | Capabilities                                      |
| -------------------- | ------------------------------------------------- |
| **Donor**            | Registers, updates availability, tracks donations |
| **Recipient**        | (Or Hospital) – Requests blood units              |
| **Admin/Blood Bank** | Manages donors, requests, inventory, and drives   |

---

## 📬 **API Endpoints**

Here are a few example endpoints:

| Method | Endpoint                 | Description                      |
| ------ | ------------------------ | -------------------------------- |
| GET    | `/donors`                | List all donors                  |
| POST   | `/request`               | Submit a blood request           |
| GET    | `/inventory/{bloodType}` | Check availability by blood type |

> Full Swagger/OpenAPI support can be added later for easier API exploration.

---

## 🤝 **Contributing**

Contributions are **very welcome**! Here's how you can help:

1. Fork the repo 🍴
2. Create a new branch (`feature/your-feature`)
3. Make your changes
4. Commit and push your branch
5. Open a Pull Request 📬
6. Get feedback, improve if needed, and merge 🚀

---

## 📄 **License**

Licensed under the **MIT License**. See the [LICENSE](LICENSE) file for full details.

---

## 🙏 **Acknowledgements**

* ❤️ Spring Boot Community
* 💾 MySQL Dev Team
* 🌍 Everyone donating blood around the world

---

## 🔗 **Useful Resources**

* 📘 [Spring Boot Documentation](https://docs.spring.io/spring-boot/)
* 🧮 [MySQL Docs](https://dev.mysql.com/doc/)
* 🔗 [GitHub Repository](https://github.com/sibasisMahapatra18/BloodAid)

---
