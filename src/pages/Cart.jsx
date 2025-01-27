import React from "react";
import useCartStore from "../StateMangamentLogic/Store"; // Adjust the import path as necessary
import { NavLink } from "react-router-dom";
import CartItem from "../components/CartItem";

const Cart = () => {
    const cart = useCartStore((state) => state.cart);
    const [totalAmount, setTotalAmount] = React.useState(0);
    const [formData, setFormData] = React.useState({
        name: "",
        contact: "",
        email: "", // Optional email field
        address: "",
    });
    const [showForm, setShowForm] = React.useState(false);
    const summaryRef = React.useRef(null); // Ref for scrolling to summary

    React.useEffect(() => {
        const total = cart.reduce((acc, curr) => acc + (curr.price * (curr.quantity || 1)), 0);
        setTotalAmount(total * 100); // Convert to paise
    }, [cart]);

    // Load Razorpay script
    React.useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script); // Cleanup script on unmount
        };
    }, []);

    const handlePayment = () => {
        const options = {
            key: "rzp_test_qspda9uePHn4Pq", // Your Razorpay test key_id
            amount: totalAmount, // Amount in paise
            currency: "INR",
            name: "Your Store Name",
            description: "Purchase Description",
            image: "https://your-logo-url.com/logo.png",
            handler(response) {
                alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                sendDetailsToTelegram("success", response.razorpay_payment_id); // Send success details to Telegram
            },
            prefill: {
                name: formData.name,
                email: formData.email || "", // Use empty string if email is not provided
                contact: formData.contact,
            },
            theme: {
                color: "#F37254",
            },
            modal: {
                ondismiss() {
                    sendDetailsToTelegram("failure", null); // Send failure details to Telegram if dismissed
                }
            }
        };

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
    };

    const sendDetailsToTelegram = (status, paymentId) => {
        const orderDetails = cart.map(item => `${item.title} (x${item.quantity}): ₹${(item.price * item.quantity).toFixed(2)}`).join(", ");
        
        const currentDateTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

        // Create the message
        const message = `
        **Payment Status:** ${status}
        **Name:** ${formData.name}
        **Contact:** ${formData.contact}
        **Email:** ${formData.email || "N/A"}
        **Address:** ${formData.address}
        **Total Items:** ${cart.length}
        **Order Details:**
        \`\`\`
        ${orderDetails}
        \`\`\`
        **Total Amount:** ₹${(totalAmount / 100).toFixed(2)}
        **Payment ID:** ${paymentId || "N/A"}
        **Current Date and Time:** ${currentDateTime}
        `.trim();


fetch('https://api.telegram.org/bot7918152804:AAEfqKOSPdTW26F1OpWBhn3onVP3pk-6Jgs/sendMessage', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        chat_id: "-1002273363586",
        text: message,
        disable_notification: true,
    }),
})
.then(res => res.json())
.then(data => console.log('Telegram response:', data))
.catch(error => console.error('Error sending message:', error));
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setShowForm(false); // Hide form after submission
        handlePayment(); // Proceed to payment
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setFormData((prevData) => ({
                    ...prevData,
                    address: `Lat: ${latitude}, Lon: ${longitude}`, // Replace with actual address lookup if needed
                }));
            }, () => {
                alert("Unable to retrieve your location.");
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const generateAutomatedAddress = () => {
        setFormData((prevData) => ({
            ...prevData,
            address: "123 Sample Street, Sample City, Sample State, 123456", // Replace with actual logic as needed
        }));
    };

    const scrollToSummary = () => {
        if (summaryRef.current) {
            summaryRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
            {cart.length > 0 ? (
                <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-center p-4">
                    <div className="w-full md:w-2/3 flex flex-col p-4 bg-white rounded-lg shadow-lg mb-8">
                        {cart.map((item, index) => (
                            <CartItem key={item.id} item={item} itemIndex={index} />
                        ))}
                    </div>
                    <div ref={summaryRef} className="w-full md:w-1/3 flex flex-col p-6 bg-white rounded-lg shadow-lg md:sticky md:top-20 mt-6 md:ml-6">
                        <h2 className="font-semibold text-xl text-green-800">Your Cart</h2>
                        <h1 className="font-semibold text-2xl text-green-700">Summary</h1>
                        <p className="text-lg">
                            <span className="text-gray-700 font-semibold">Total Items: {cart.length}</span>
                        </p>
                        <div className="flex flex-col items-start">
                            <p className="text-xl font-bold">
                                <span className="text-gray-700 font-semibold">Total Amount:</span> ₹{(totalAmount / 100).toFixed(2)}
                            </p>
                            {!showForm ? (
                                <button 
                                    onClick={() => setShowForm(true)} 
                                    className="bg-green-700 hover:bg-green-600 rounded-lg text-white transition duration-300 ease-linear mt-4 border-2 border-green-600 font-bold hover:text-green-700 p-3 px-10 text-lg"
                                >
                                    Check Out Now
                                </button>
                            ) : (
                                <form onSubmit={handleFormSubmit} className="flex flex-col mt-4">
                                    <input 
                                        type="text" 
                                        name="name" 
                                        placeholder="Your Name" 
                                        value={formData.name} 
                                        onChange={handleFormChange} 
                                        required 
                                        className="p-2 border rounded mb-2"
                                    />
                                    <input 
                                        type="tel" 
                                        name="contact" 
                                        placeholder="Your Phone Number" 
                                        value={formData.contact} 
                                        onChange={handleFormChange} 
                                        required 
                                        className="p-2 border rounded mb-2"
                                    />
                                    <input 
                                        type="email" 
                                        name="email" 
                                        placeholder="Your Email (optional)" 
                                        value={formData.email} 
                                        onChange={handleFormChange} 
                                        className="p-2 border rounded mb-2"
                                    />
                                    <input 
                                        type="text" 
                                        name="address" 
                                        placeholder="Delivery Address" 
                                        value={formData.address} 
                                        onChange={handleFormChange} 
                                        required 
                                        className="p-2 border rounded mb-2"
                                    />
                                    
                                    {/* Buttons for current location and automated address */}
                                    <div className="flex space-x-2 mb-4">
                                        <button type="button" onClick={getCurrentLocation} className="bg-blue-500 hover:bg-blue-400 text-white rounded-lg p-2">
                                            Use Current Location
                                        </button>
                                        <button type="button" onClick={generateAutomatedAddress} className="bg-yellow-500 hover:bg-yellow-400 text-white rounded-lg p=2">
                                            Generate Address
                                        </button>
                                    </div>

                                    <button type="submit" className="bg-green-700 hover:bg-green-600 rounded-lg text-white transition duration=300 ease-linear mt=4 border=2 border-green=600 font-bold hover=text-green=700 p=3 px=10 text-lg">
                                        Proceed to Payment
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-5">
                    <h1 className="text-gray-700 font-semibold text-xl mb-2">Your cart is empty!</h1>
                    <NavLink to="/">
                        <button className="uppercase bg-green-600 hover:bg-green-700 rounded-lg text-white transition duration=300 ease-linear mt=5 border=2 border-green=600 font-semibold hover=text-white p=3 px=10 tracking-wider">
                            Shop Now
                        </button>
                    </NavLink>
                </div>
            )}
            
            {/* Floating Button for Summary */}
            {cart.length > 0 && (
                <button 
                    onClick={scrollToSummary} 
                    className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
                >
                    {cart.length} Items
                </button>
            )}
        </div>
    );
};

export default Cart;
