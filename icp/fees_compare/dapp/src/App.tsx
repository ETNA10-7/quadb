import { useEffect, useState } from "react";
import backend from "./icp"; // ✅ Ensure correct import

interface Transaction {
    id: number;
    user: string;
    gas_fee: number;
    timestamp: number;
    cycles_used: number; // Used for both memory and stable
}

function App() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadTransactions() {
            try {
                setLoading(true);
                setError(null);

                // Fetch transactions from canister
                // const storedTxs: Transaction[] = await backend.get_transactions();
                // const recentTxs: Transaction[] = await backend.get_recent_transactions();
                const storedTxs = await backend.get_transactions() as Transaction[];
                const recentTxs = await backend.get_recent_transactions() as Transaction[];


                setTransactions(storedTxs);
                setRecentTransactions(recentTxs);
            } catch (error) {
                console.error("Error fetching transactions:", error);
                setError("Failed to load transactions.");
            } finally {
                setLoading(false);
            }
        }
        loadTransactions();
    }, []);

    return (
        <div className="container">
            <h1>ICP Transaction Cycle Cost Comparison</h1>

            {loading && <p>Loading transactions...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <h2>📌 Recent Transactions (In-Memory)</h2>
            {recentTransactions.length > 0 ? (
                <ul>
                    {recentTransactions.map(tx => (
                        <li key={tx.id}>
                            <strong>Tx {tx.id}:</strong> User {tx.user} - Gas Fee: {tx.gas_fee} - Cycles Used: {tx.cycles_used}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No recent transactions found.</p>
            )}

            <h2>💾 Persistent Transactions (Stored on Canister)</h2>
            {transactions.length > 0 ? (
                <ul>
                    {transactions.map(tx => (
                        <li key={tx.id}>
                            <strong>Tx {tx.id}:</strong> User {tx.user} - Gas Fee: {tx.gas_fee} - Cycles Used: {tx.cycles_used}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No stored transactions found.</p>
            )}
        </div>
    );
}

export default App;
