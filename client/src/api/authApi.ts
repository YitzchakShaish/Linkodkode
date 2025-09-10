export async function signupTS(username: string, password: string, role?: string) {
  const res = await fetch("http://localhost:3000/auth/signup", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, role }),
    credentials: "include" 
  });
  return res;
};

export async function loginTS(username: string, password: string, role?: string) {
  const res = await fetch("http://localhost:3000/auth/login", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, role }),
    credentials: "include" 
  });

  const data = await res.json();

  if (res.ok) {
    return {
      status: res.status,
      message: data.message || 'Login succeeded',
      data: data || null
    };
  } else {
    return {
      name: data.name,
      status: res.status,
      message: data.message || 'Login failed',
      playerId: data.playerId || null,
      role: data.role || null
    };
  }
}

export async function logoutTS() {
  const res = await fetch("http://localhost:3000/logout", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
    credentials: "include" 
  });

  const data = await res.json();

  if (res.ok) {
    return {
      status: res.status,
      message: data.message || 'Logout succeeded'
    };
  } else {
    return {
      status: res.status,
      message: data.message || 'Logout failed'
    };
  }
}


