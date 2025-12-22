import { useQuery } from "@tanstack/react-query";

const User2 = () => {
  const { isPending, data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users");
      return res.json();
    },
  });

  if (isPending) {
    return <span>Loading...</span>;
  }
  return (
    <div>
      {users.map((user) => (
        <div>
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
};

export default User2;
