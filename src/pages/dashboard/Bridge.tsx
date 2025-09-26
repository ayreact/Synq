import React, { useState, useEffect } from 'react';

// SVG Icon components
const VolumeIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ChainsIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const SuccessIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ChevronDownIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const EthIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22.75L3.25 12L12 1.25L20.75 12L12 22.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M12 17.75V1.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 17.75L3.25 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 17.75L20.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.25 12L12 22.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M20.75 12L12 22.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
const PolygonIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.42 19.16a2.48 2.48 0 0 1-2.26-1.44L2.62 12a2.48 2.48 0 0 1 0-2.32l2.54-5.72a2.48 2.48 0 0 1 2.26-1.44h9.16a2.48 2.48 0 0 1 2.26 1.44l2.54 5.72a2.48 2.48 0 0 1 0 2.32l-2.54 5.72a2.48 2.48 0 0 1-2.26 1.44Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 14.53 7.42 19.16M16.58 19.16 12 14.53M12 14.53V2.52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const QuaiIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" stroke="currentColor" strokeWidth="1.5"/><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" strokeWidth="1.5"/></svg>;
const ArrowRightIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14m-7-7 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>

const BridgeStatusModal = ({ isOpen, onClose, status, amount, fromChain, toChain }) => {
    if (!isOpen) return null;

    const getStatusContent = () => {
        switch (status) {
            case 'in_progress':
                return (
                    <>
                        <p className="text-white text-lg sm:text-xl font-medium mb-8">Bridge in Progress</p>
                        <div className="flex items-center justify-center gap-4 text-gray-300 mb-6">
                            <span>{fromChain}</span>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                            <span>{toChain}</span>
                        </div>
                        <p className="text-white text-2xl sm:text-3xl font-bold mb-8">{amount}</p>
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mb-8"></div>
                        <button
                            onClick={onClose} // In a real app, this might trigger a cancellation
                            className="py-3 px-6 rounded-lg bg-gradient-to-r from-[#8B1E3F] to-[#6C3B9E] text-white text-base font-medium hover:opacity-90 transition w-full"
                        >
                            Cancel
                        </button>
                    </>
                );
            case 'completed':
                return (
                    <>
                        <svg className="w-16 h-16 text-green-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <p className="text-green-500 text-xl sm:text-2xl font-medium mb-4">Bridge Completed</p>
                        <p className="text-gray-300 text-base mb-8">Your funds have been bridged successfully</p>
                        <button
                            onClick={onClose}
                            className="py-3 px-6 rounded-lg bg-gradient-to-r from-[#8B1E3F] to-[#6C3B9E] text-white text-base font-medium hover:opacity-90 transition w-full"
                        >
                            Back Home
                        </button>
                    </>
                );
            case 'failed':
                return (
                    <>
                        <svg className="w-16 h-16 text-red-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <p className="text-red-500 text-xl sm:text-2xl font-medium mb-4">Bridge Failed</p>
                        <p className="text-gray-300 text-base mb-8">There seems to be an issue with this transaction</p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <button
                                className="flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-purple-700 to-purple-900 text-white text-base font-medium hover:opacity-90 transition"
                            >
                                Retry
                            </button>
                            <button
                                onClick={onClose}
                                className="flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-[#8B1E3F] to-[#6C3B9E] text-white text-base font-medium hover:opacity-90 transition"
                            >
                                Back Home
                            </button>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-[#1A1A1A] rounded-xl p-8 max-w-sm w-full text-center flex flex-col items-center justify-between min-h-[350px]">
                {getStatusContent()}
            </div>
        </div>
    );
};

const Bridge = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bridgeStatus, setBridgeStatus] = useState('in_progress'); // 'in_progress', 'completed', 'failed'
    const [bridgeAmount, setBridgeAmount] = useState('$2509.23'); // Example amount
    const [fromChain, setFromChain] = useState('Ethereum');
    const [toChain, setToChain] = useState('Quai');

    const options = [
        { value: 'Ethereum', label: 'Ethereum' },
        { value: 'Quai', label: 'Quai Network' },
    ];

    const handleBridgeClick = () => {
        setIsModalOpen(true);
        setBridgeStatus('in_progress'); // Reset to in_progress for a new bridge attempt

        // Simulate an asynchronous bridging process
        setTimeout(() => {
            // Randomly succeed or fail after 3 seconds
            const success = Math.random() > 0.5;
            if (success) {
                setBridgeStatus('completed');
            } else {
                setBridgeStatus('failed');
            }
        }, 3000);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const transactions = [
        {
            date: '20-7-2025 14:29',
            fromChain: 'Quai',
            toChain: 'Eth',
            status: 'Pending',
            amount: '1,000 QUAI',
            fiatValue: '~ 8,837',
            statusColor: 'amber'
        },
        {
            date: '20-7-2025 14:29',
            fromChain: 'Eth',
            toChain: 'Quai',
            status: 'Completed',
            amount: '2.5ETH',
            fiatValue: '~ 8,837',
            statusColor: 'green'
        },
        {
            date: '20-7-2025 14:29',
            fromChain: 'Quai',
            toChain: 'Eth',
            status: 'Failed',
            amount: '5,000 QUAI',
            fiatValue: '~ 8,837',
            statusColor: 'red'
        },
        {
            date: '20-7-2025 10:00',
            fromChain: 'Eth',
            toChain: 'Quai',
            status: 'Completed',
            amount: '1.0 ETH',
            fiatValue: '~ 3,500',
            statusColor: 'green'
        },
    ];

    // Get the 3 most recent transactions
    const recentTransactions = transactions.slice(0, 3);

    const getChainIcon = (chain) => {
        switch (chain) {
            case 'Quai':
                return <QuaiIcon />;
            case 'Eth':
                return <EthIcon />;
            default:
                return null;
        }
    };

    const handleFromChange = (event) => {
        const newFromValue = event.target.value;
        setFromChain(newFromValue);

        // If the new 'From' value is the same as the current 'To' value,
        // we need to automatically change 'To' to the *other* available option.
        if (newFromValue === toChain) {
            // Find the option that is NOT the newFromValue
            const otherOption = options.find(opt => opt.value !== newFromValue);
            if (otherOption) {
                setToChain(otherOption.value);
            }
        }
    };

    const handleToChange = (event) => {
        const newToValue = event.target.value;
        setToChain(newToValue);

        // If the new 'To' value is the same as the current 'From' value,
        // we need to automatically change 'From' to the *other* available option.
        if (newToValue === fromChain) {
            // Find the option that is NOT the newToValue
            const otherOption = options.find(opt => opt.value !== newToValue);
            if (otherOption) {
                setFromChain(otherOption.value);
            }
        }
    };

    return (
        <div className="flex flex-col gap-3"> {/* bridge-page */}
            <div className="text-left mb-6"> {/* bridge-header */}
                <h1 className="text-4xl font-extrabold font-space-grotesk mb-2 text-gray-900 dark:text-white">Bridge & Multi-Chain Assets</h1>
                <p className="text-md text-gray-400">Seamlessly manage and transfer your assets across different chains</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex flex-col gap-3 bg-black rounded-md p-6"> {/* bridge-stat-card */}
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-blue-600"> {/* stat-icon-wrapper */}
                        <VolumeIcon />
                    </div>
                    <span className="text-md text-gray-500">Volume Bridged (30d)</span>
                    <p className="text-2xl font-bold font-space-grotesk text-gray">$1,928,829</p>
                </div>
                <div className="flex flex-col gap-3 bg-black rounded-md p-6"> {/* bridge-stat-card */}
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-purple-600"> {/* stat-icon-wrapper */}
                        <ChainsIcon />
                    </div>
                    <span className="text-md text-gray-500">Chains interacted with</span>
                    <p className="text-2xl font-bold font-space-grotesk text-gray">2</p>
                </div>
                <div className="flex flex-col gap-3 bg-black rounded-md p-6"> {/* bridge-stat-card */}
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-green-600"> {/* stat-icon-wrapper */}
                        <SuccessIcon />
                    </div>
                    <span className="text-md text-gray-500">Transaction Success Rate</span>
                    <p className="text-2xl font-bold font-space-grotesk text-gray">62.5%</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-0"> {/* bridge-assets-overview */}
                <div className="flex items-center gap-4 p-6 rounded-md bg-black"> {/* asset-balance-card ethereum */}
                    <div className="w-12 h-12 flex-shrink-0"> {/* asset-icon */}
                        <EthIcon />
                    </div>
                    <div className="flex flex-col"> {/* asset-info */}
                        <span className="text-gray-600 dark:text-gray-400 block mb-1">Ethereum</span>
                        <p className="text-2xl font-bold font-['Space_Grotesk'] text-gray-900 dark:text-white">12.5 <small className="text-base text-gray-600 dark:text-gray-400">ETH</small></p>
                        <small className="text-gray-600 dark:text-gray-400">$43,839,832</small>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-6 rounded-md bg-black"> {/* asset-balance-card quai */}
                    <div className="w-12 h-12 flex-shrink-0"> {/* asset-icon */}
                        <QuaiIcon />
                    </div>
                    <div className="flex flex-col"> {/* asset-info */}
                        <span className="text-gray-600 dark:text-gray-400 block mb-1">Quai Network</span>
                        <p className="text-2xl font-bold font-['Space_Grotesk'] text-gray-900 dark:text-white">25,000 <small className="text-base text-gray-600 dark:text-gray-400">QUAI</small></p>
                        <small className="text-gray-600 dark:text-gray-400">$12,500,000</small>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mt-10"> {/* bridge-main-section */}
                <div className=""> {/* bridge-assets-card */}
                    <h3 className="text-2xl font-bold mb-6 text-white">Bridge Assets</h3>
                    <div className="bg-[#1A1A1A] rounded-xl p-6 flex flex-col gap-8"> {/* bridge-form */}
                        <div className="flex flex-col sm:flex-row justify-between gap-6"> {/* chain-selectors */}
                            <div className="flex-1"> {/* chain-selector */}
                                <label className="block text-gray-600 dark:text-gray-400 mb-2 text-xs">From</label>
                                <div className="relative">
                                    <select
                                        className="w-full appearance-none px-4 py-3 bg-black border border-gray-700 rounded-lg text-base text-white text-sm cursor-pointer"
                                        value={fromChain}
                                        onChange={handleFromChange}
                                    >
                                        {options.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                                        <ChevronDownIcon className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1"> {/* chain-selector */}
                                <label className="block text-gray-600 dark:text-gray-400 mb-2 text-xs">To</label>
                                <div className="relative">
                                    <select
                                        className="w-full appearance-none px-4 py-3 bg-black border border-gray-700 rounded-lg text-base text-white text-sm cursor-pointer"
                                        value={toChain}
                                        onChange={handleToChange}
                                    >
                                        {options.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                                        <ChevronDownIcon className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col"> {/* amount-input */}
                            <label className="block text-gray-400 mb-2 text-xs">You will send</label>
                            <div className="flex items-center bg-black border border-gray-700 rounded-lg p-3"> {/* input-wrapper */}
                                <span className="text-gray-400 text-sm">$0.00</span>
                                <input type="text" placeholder="ETH" className="w-full bg-transparent border-none text-white text-base text-sm text-right focus:outline-none" />
                            </div>
                        </div>
                         <div className="flex flex-col"> {/* amount-input */}
                            <label className="block text-gray-400 mb-2 text-xs">You would receive</label>
                             <div className="flex items-center bg-black border border-gray-700 rounded-lg p-3"> {/* input-wrapper */}
                                <span className="text-gray-400 text-sm">$0.00</span>
                                <input type="text" placeholder="QUAI" className="w-full bg-transparent border-none text-white text-base text-sm text-right focus:outline-none" />
                            </div>
                        </div>
                        <button onClick={handleBridgeClick} className="py-3 px-4 rounded-lg bg-gradient-to-r from-[#8B1E3F] to-[#6C3B9E] text-white text-base font-medium hover:bg-gradient-to-l transition">Bridge</button> {/* send-btn */}
                    </div>
                    <BridgeStatusModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        status={bridgeStatus}
                        amount={bridgeAmount}
                        fromChain={fromChain}
                        toChain={toChain}
                    />
                </div>

                <div className=""> {/* bridge-transactions-card */}
                    <h3 className="text-2xl font-bold mb-6 text-white">Bridge Transactions</h3>
                    <div className="flex flex-col gap-8"> {/* transactions-list */}
                        {recentTransactions.map((transaction, index) => (
                            <div key={index} className="flex justify-between items-center p-4 bg-black rounded-lg"> {/* transaction-item */}
                                <div className="flex flex-col"> {/* transaction-info */}
                                    <span className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">{transaction.date}</span>
                                    <div className="flex items-center gap-2"> {/* transaction-chains */}
                                        {getChainIcon(transaction.fromChain)}
                                        <ArrowRightIcon />
                                        {getChainIcon(transaction.toChain)}
                                    </div>
                                </div>
                                <div className="text-right flex flex-col items-end"> {/* transaction-details */}
                                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-${transaction.statusColor}-900/20 text-${transaction.statusColor}-300 mb-2`}>
                                        {transaction.status}
                                    </span> {/* status */}
                                    <p className="font-medium text-gray-900 dark:text-white">{transaction.amount}</p>
                                    <small className="text-gray-600 dark:text-gray-400">{transaction.fiatValue}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bridge;