import { lazy, Suspense, useState } from "react";
import { wait } from "../utils/wait.tsx";

const AdminData = lazy(() => wait(1000).then(() => import("./AdminData.tsx")));
const importSumFn = () =>
  import("../sum.tsx").then((module) => {
    alert(module.sum(2, 2));
  });

function Home() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <section className="home-panel">
      <div className="home-header">
        <p className="eyebrow">React code splitting</p>
        <h1>Home</h1>
        <p className="intro">
          A compact playground for lazy routes, dynamic imports, and Suspense.
        </p>
      </div>

      <div className="actions">
        <button className="secondary-button" onClick={() => importSumFn()}>
          Add 2 + 2
        </button>

        <button onClick={() => setIsAdmin((prev) => !prev)}>
          {isAdmin ? "Hide Admin" : "Show Admin"}
        </button>
      </div>

      <Suspense
        fallback={<p className="status-card">Loading admin dashboard...</p>}
      >
        <div className="status-card">
          {isAdmin ? <AdminData /> : <h2>Not Admin</h2>}
        </div>
      </Suspense>
    </section>
  );
}

export default Home;
