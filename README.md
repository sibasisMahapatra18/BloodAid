```
# 🩸 BloodAid

BloodAid is a Java Spring Boot application designed to create a centralized blood donation platform. It facilitates connections between donors, recipients, and blood banks while offering tools for managing donor databases, blood requests, and inventory—bringing innovation to life-saving blood donation services.

---

## 🎯 Features

- 🚑 **User Registration** for donors and hospitals.
- 🩸 **Blood Inventory Management** for blood banks/admins.
- 📥 **Blood Request Portal** for patients and hospitals to request required blood types.
- 🔍 **Search & Match Engine** to find available donors or nearest blood banks.
- 🗓️ **Donation Drive Scheduling** .
- 📊 **Admin Dashboard** to oversee requests, stock updates, and system operations.

---

## 🧰 Tech Stack

- **Backend:** Java 23, Spring Boot
- **Frontend:** HTML, CSS, JavaScript (possibly using Thymeleaf or JSP)
- **Database:** MySQL (update your application.properties accordingly)
- **Build Tool:** Maven
- **Security:** Spring Security 
- **API Testing:** Postman 

---

## ⚙️ Getting Started

### 🔧 Prerequisites

- Java 23 or higher installed
- Maven installed
- MySQL server running locally or remotely
- IDE (like IntelliJ IDEA / Eclipse/Vscode)

---

### 🚀 Installation Steps

1. **Clone the Repository**
   ```
   git clone https://github.com/sibasisMahapatra18/BloodAid.git
   cd BloodAid
   ```

2. **Configure the Database**

   Update `src/main/resources/application.properties` with your MySQL credentials and connection URL:

   ```
   spring.datasource.url=jdbc:mysql://localhost:3306/bloodaid
   spring.datasource.username=YOUR_USERNAME
   spring.datasource.password=YOUR_PASSWORD
   spring.jpa.hibernate.ddl-auto=update
   ```

3. **Build and Run the Application**

   ```
   mvn clean install
   mvn spring-boot:run
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:8090/
   ```

---

## 📁 Project Structure

```
BloodAid/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/bloodaid/
│   │   │       ├── controller/
│   │   │       ├── model/
│   │   │       ├── repository/
│   │   │       ├── service/
│   │   │       └── BloodAidApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── templates/
├── pom.xml
└── README.md
```

---

## 👨‍⚕️ User Roles

- **Donor:** Registers and manages their donations
- **Recipient/Hospital:** Requests for blood units
- **Admin/Blood Bank:** Manages inventory, donor lists, blood drives

---

## 📬 API Endpoints


Examples:

- `GET /donors` - List all donors
- `POST /request` - Submit a blood request
- `GET /inventory/{bloodType}` - Check availability

---

## 🤝 Contributions

Contributions are welcome!

To contribute:

1. Fork the repository
2. Create a new branch with your feature or bugfix
3. Commit your changes and open a pull request  
4. Wait for code review and discussion

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgements

- Spring Boot Community
- MySQL Community
---

## 📎 Useful Links

- 🧾 [Spring Boot Documentation](https://docs.spring.io/spring-boot/)
- 💾 [MySQL Docs](https://dev.mysql.com/doc/)
- 📤 [GitHub Repo](https://github.com/sibasisMahapatra18/BloodAid)

---
```
