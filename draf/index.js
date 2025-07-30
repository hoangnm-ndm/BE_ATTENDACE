const students = [
	{
		id: 1,
		email: "hoang@gmail.com",
		fullname: "Hoang Nguyen",
		studentId: "123456789",
		phone: "0123456789",
		schoolYear: "2023-2024",
		majorId: "major1",
	},
	{
		id: 2,
		email: "nguyenvana@gmail.com",
		fullname: "Nguyen Van A",
		studentId: "987654321",
		phone: "0987654321",
		schoolYear: "2023-2024",
		majorId: "major2",
	},
	{
		id: 3,
		email: "nguyenvanb@gmail.com",
		fullname: "Nguyen Van B",
		studentId: "456789123",
		phone: "0123456789",
		schoolYear: "2023-2024",
		majorId: "major3",
	},
];

students.find((item) => item.email === "nguyenvana@gmail.com");

const indexesForEmail = {
	"nguyenvana@gmail.com": {
		id: 2,
		email: "nguyenvana@gmail.com",
		fullname: "Nguyen Van A",
		studentId: "987654321",
		phone: "0987654321",
		schoolYear: "2023-2024",
		majorId: "major2",
	},
	"nguyenvanb@gmail.com": 3,
	"hoang@gmail.com": 1,
};

indexesForEmail["nguyenvana@gmail.com"] = {
	id: 2,
	email: "nguyenvana@gmail.com",
	fullname: "Nguyen Van A",
	studentId: "987654321",
	phone: "0987654321",
	schoolYear: "2023-2024",
	majorId: "major2",
};
