export const MenuList = [

    //Dashboard
    {
        title: 'Dashboard',
        classsChange: 'mm-collapse',
        iconStyle: <i className="flaticon-381-networking" />,
        content: [
            {
                title: 'Dashboard',
                to: 'dashboard',
            },
        ],
    },

    //Game
    {
        title: 'Game',
        classsChange: 'mm-collapse',
        iconStyle: <i className="flaticon-381-television" />,
        content: [
            {
                title: 'Create Game',
                to: 'create-game'
            },
            {
                title: 'All Game',
                to: 'list-game'
            },
            {
                title: 'Create Slot',
                to: 'create-slot'
            },
        ],
    },

    //Wallet
    {
        title: 'Wallet',
        classsChange: 'mm-collapse',
        iconStyle: <i className="flaticon-381-controls-3" />,
        content: [
            {
                title: 'List Wallet',
                to: 'list-wallet',
            },
            {
                title: 'List Withdrawal',
                to: 'list-withdrawal',
            },
        ]
    },
    //Result
    {
        title: 'Result',
        classsChange: 'mm-collapse',
        iconStyle: <i className="flaticon-381-internet" />,
        content: [
            {
                title: 'Result',
                to: 'create-result',
            },
            {
                title: 'Result List',
                to: 'list-result',
            },
        ]
    },
];