import { useEffect, useState } from "react";

const STATUS_COLORS: Record<number, string> = {
    0: "#52c41a", // Available
    1: "#ff4d4f", // Unavailable
    2: "#1677ff", // MustTeach
    3: "#13c2c2", // Desired
    4: "#fa8c16", // Undesired
};

const STATUS_LABELS: Record<number, string> = {
    0: "Διαθέσιμος",
    1: "Μη Διαθέσιμος",
    2: "Υποχρεωτική Διδασκαλία",
    3: "Επιθυμητή Διδασκαλία",
    4: "Ανεπιθύμητη Διδασκαλία",
};

export default function AvailabilityTable({ availbility }: { availbility: number[][] }) {
    const [availabilities, setAvailabilities] = useState<number[][]>(() =>
        availbility.map(row => [...row])
    );

    useEffect(() => {
        setAvailabilities(availbility.map(row => [...row]));
    }, [availbility]);

    function handleSelectSquare(rowIndex: number, colIndex: number) {
        setAvailabilities((prevAvailabilities) => {
            const updatedAvailabilities = prevAvailabilities.map(row => [...row]);
            updatedAvailabilities[rowIndex][colIndex] = (updatedAvailabilities[rowIndex][colIndex] + 1) % 5;
            return updatedAvailabilities;
        });
    }

    const DAY_LETTERS = ["Δ", "Τ", "Τ", "Π", "Π"];

    return (
        <>
        <table style={{ borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    <th />
                    {Array.from({ length: 6 }, (_, i) => (
                        <th key={i} style={{ width: 44, textAlign: "center", paddingBottom: 4, fontWeight: 600 }}>
                            {i + 1}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {availabilities.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td style={{ paddingRight: 6, fontWeight: 600, textAlign: "center" }}>
                            {DAY_LETTERS[rowIndex]}
                        </td>
                        {row.map((value, colIndex) => (
                            <td key={colIndex} style={{ padding: 2 }}>
                                <button
                                    title={STATUS_LABELS[value]}
                                    onClick={() => handleSelectSquare(rowIndex, colIndex)}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        backgroundColor: STATUS_COLORS[value],
                                        border: "1px solid rgba(0,0,0,0.15)",
                                        borderRadius: 4,
                                        cursor: "pointer",
                                    }}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px", marginTop: 8 }}>
            {Object.entries(STATUS_COLORS).map(([value, color]) => (
                <div key={value} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                    <span style={{
                        display: "inline-block",
                        width: 14,
                        height: 14,
                        backgroundColor: color,
                        border: "1px solid rgba(0,0,0,0.15)",
                        borderRadius: 3,
                        flexShrink: 0,
                    }} />
                    {STATUS_LABELS[Number(value)]}
                </div>
            ))}
        </div>
        </>
    );
}