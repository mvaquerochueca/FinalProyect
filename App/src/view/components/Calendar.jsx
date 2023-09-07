import React, { useState } from 'react'
import Aside from './Aside'
import NavBar from './NavBar'

export default function Calendar() {
    const currentDate = new Date()
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay()

    const [reminders, setReminders] = useState([])
    const [selectedDay, setSelectedDay] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [reminderText, setReminderText] = useState('')
    const [reminderTime, setReminderTime] = useState('')

    const colors = [
        'red',
        'blue',
        'green',
        'purple',
        'orange',
        'grey',
        'pink',
        'teal',
        'indigo',
        'yellow',
    ]
    const goToPreviousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11)
            setCurrentYear(currentYear - 1)
        } else {
            setCurrentMonth(currentMonth - 1)
        }
    }

    const goToNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0)
            setCurrentYear(currentYear + 1)
        } else {
            setCurrentMonth(currentMonth + 1)
        }
    }
    const addReminder = () => {
        if (
            selectedDay !== null &&
            reminderText !== '' &&
            reminderTime !== ''
        ) {
            const randomColorIndex = Math.floor(Math.random() * colors.length) // Genera el índice aleatorio aquí
            const newReminder = {
                day: selectedDay,
                text: reminderText,
                time: reminderTime,
                color: colors[randomColorIndex], // Asigna un color aleatorio
            }
            setReminders([...reminders, newReminder])
            setSelectedDay(null)
            setReminderText('')
            setReminderTime('')
            setModalOpen(false)
        }
    }

    const renderCalendar = () => {
        const calendar = []

        for (let i = 1; i <= daysInMonth; i++) {
            const isToday =
                new Date(currentYear, currentMonth, i).toDateString() ===
                currentDate.toDateString()
            const reminder = reminders.find((r) => r.day === i)

            const dayClasses = `border p-2 text-center relative ${
                isToday ? 'bg-green-500 text-white' : ''
            } ${reminder ? `bg-${reminder.color}-200` : ''}`

            calendar.push(
                <button
                    key={i}
                    className={dayClasses}
                    onClick={() => {
                        setSelectedDay(i)
                        setModalOpen(true)
                    }}
                >
                    {i}
                    {reminder && (
                        <div
                            className={`absolute top-0 left-0 w-full h-full bg-${reminder.color}-200 opacity-75`}
                        />
                    )}
                </button>
            )
        }

        return calendar
    }

    return (
        <div className="mt-4 sm:ml-64">
            <Aside />
            <NavBar />
            <div className="flex justify-center items-center mb-4">
                <button
                    className="mt-20 mb-2 mr-2 flex items-center justify-center px-3 h-8 text-sm font-medium text-black "
                    onClick={goToPreviousMonth}
                >
                    <svg
                        className="w-3.5 h-3.5 mr-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 5H1m0 0 4 4M1 5l4-4"
                        />
                    </svg>
                    Prev
                </button>
                <h2 className="mb-2 text-lg font-bold text-center mt-20">
                    {new Date(currentYear, currentMonth)
                        .toLocaleDateString('default', {
                            month: 'long',
                            year: 'numeric',
                        })
                        .replace(/^\w/, (c) => c.toUpperCase())}
                </h2>

                <button
                    className="mt-20 mb-2 ml-2 flex items-center justify-center px-3 h-8 text-sm font-medium text-black "
                    onClick={goToNextMonth}
                >
                    Next
                    <svg
                        className="w-3.5 h-3.5 ml-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                </button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-sm ml-2 mr-2">
                <div className="text-center font-bold">Sun</div>
                <div className="text-center font-bold">Mon</div>
                <div className="text-center font-bold">Tue</div>
                <div className="text-center font-bold">Wed</div>
                <div className="text-center font-bold">Thu</div>
                <div className="text-center font-bold">Fri</div>
                <div className="text-center font-bold">Sat</div>
                {Array.from({ length: firstDayOfWeek }).map((_, index) => (
                    <div key={index}></div>
                ))}
                {renderCalendar()}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white rounded-lg w-full max-w-md p-6">
                        <h3 className="text-xl font-semibold text-center mb-4">
                            Reminders{' '}
                        </h3>
                        <input
                            type="text"
                            placeholder="Texto del recordatorio"
                            value={reminderText}
                            onChange={(e) => setReminderText(e.target.value)}
                            className="mb-2 border p-2 w-full"
                        />
                        <input
                            type="time"
                            value={reminderTime}
                            onChange={(e) => setReminderTime(e.target.value)}
                            className="mb-2 border p-2 w-full"
                        />
                        <div className="flex justify-center">
                            <button
                                className="mr-2 border-2 border-gray-300 rounded-md pl-2 pr-2"
                                type="submit"
                                onClick={addReminder}
                            >
                                Create
                            </button>
                            <button
                                className="btn-secondary border-2 border-gray-300 rounded-md pl-2 pr-2"
                                type="button"
                                onClick={() => setModalOpen(false)} // Utiliza una función
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* List of reminders */}
            <div className="mt-4 ml-2">
                <h3 className="font-semibold">Recordatorios:</h3>
                <ul className="ml-4">
                    {reminders.map((reminder, index) => (
                        <li key={index}>
                            {reminder.day}/{currentMonth + 1}/{currentYear} -{' '}
                            {reminder.time} - {reminder.text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
