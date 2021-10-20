export const fetchUsers = async(query:string):Promise<any>=>{ 
  const res = await fetch(
  "https://api.github.com/search/users?per_page=10&q=" + query,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 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",
    },
  }
);
const results = await res.json();

return results
}