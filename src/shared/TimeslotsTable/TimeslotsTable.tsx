import { useEffect, useState } from "react";
import type { Teacher } from "../../modules/timetable/types";

export default function TimeslotsTable({ timeslots }: { timeslots: Teacher[][] }) {
    const [teacher, setTeacher] = useState<Teacher[][]>(() =>
        timeslots.map(row => [...row])
    );

    useEffect(() => {
        setTeacher(timeslots.map(row => [...row]));
    }, [timeslots]);

    const DAY_LETTERS = ["Α", "Β", "Γ", "Δ", "Ε", "ΣΤ1", "ΣΤ2"];

    return (
        <>
        <table style={{ borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    <th />
                    {Array.from({ length: 30 }, (_, i) => (
                        <th key={i} style={{ width: 44, textAlign: "center", paddingBottom: 4, fontWeight: 600 }}>
                            {(i % 6) + 1}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {teacher.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td style={{ paddingRight: 6, fontWeight: 600, textAlign: "center" }}>
                            {DAY_LETTERS[rowIndex]}
                        </td>
                        {row.map((value, colIndex) => (
                            <td key={colIndex} style={{ padding: 2 }}>
                                <button
                                    title={`${value.firstName} ${value.lastName}`}
                                  
                                    // onClick={() => handleSelectSquare(rowIndex, colIndex)}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        backgroundColor: value.color,
                                        border: "1px solid rgba(0,0,0,0.15)",
                                        borderRadius: 4,
                                        cursor: "pointer",
                                    }}
                                >
                                  {value.short}
                                </button>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
}