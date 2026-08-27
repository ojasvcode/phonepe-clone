const STORE_KEY = 'phonepe_data';
const COLORS = ['#6d28d9','#db2777','#059669','#d97706','#2563eb','#dc2626','#7c3aed','#0891b2'];

function defaults() {
  const n = new Date();
  const d = (h) => new Date(n - 1000*60*60*h).toISOString();
  return {
    user: { name:'Ojas', phone:'+91 98765 43210', email:'ojas@email.com', avatar:'O', upiId:'ojas@phonepe',
      bankAccounts: [
        { id:1, bank:'HDFC Bank', accountNo:'****4521', balance:25000, isPrimary:true, color:'#1e40af' },
        { id:2, bank:'SBI', accountNo:'****7832', balance:15000, isPrimary:false, color:'#1d4ed8' }
      ]},
    contacts: [
      { id:1, name:'Rahul Sharma', phone:'+91 98765 43211', upiId:'rahul@upi', color:COLORS[0] },
      { id:2, name:'Priya Patel', phone:'+91 98765 43212', upiId:'priya@upi', color:COLORS[1] },
      { id:3, name:'Amit Kumar', phone:'+91 98765 43213', upiId:'amit@upi', color:COLORS[2] },
      { id:4, name:'Sneha Gupta', phone:'+91 98765 43214', upiId:'sneha@upi', color:COLORS[3] },
      { id:5, name:'Vikram Singh', phone:'+91 98765 43215', upiId:'vikram@upi', color:COLORS[4] },
      { id:6, name:'Anjali Nair', phone:'+91 98765 43216', upiId:'anjali@upi', color:COLORS[5] },
      { id:7, name:'Rohit Joshi', phone:'+91 98765 43217', upiId:'rohit@upi', color:COLORS[6] },
      { id:8, name:'Meera Reddy', phone:'+91 98765 43218', upiId:'meera@upi', color:COLORS[7] },
    ],
    transactions: [
      { id:'TXN001',type:'sent',name:'Rahul Sharma',amount:500,date:d(0.5),status:'success',category:'transfer' },
      { id:'TXN002',type:'received',name:'Priya Patel',amount:1200,date:d(2),status:'success',category:'transfer' },
      { id:'TXN003',type:'sent',name:'Jio Prepaid',amount:299,date:d(5),status:'success',category:'recharge' },
      { id:'TXN004',type:'sent',name:'Electricity Bill',amount:1450,date:d(24),status:'success',category:'bill' },
      { id:'TXN005',type:'received',name:'Amit Kumar',amount:2000,date:d(48),status:'success',category:'transfer' },
      { id:'TXN006',type:'sent',name:'Sneha Gupta',amount:750,date:d(48),status:'success',category:'transfer' },
      { id:'TXN007',type:'sent',name:'Netflix',amount:649,date:d(72),status:'success',category:'bill' },
      { id:'TXN008',type:'received',name:'Vikram Singh',amount:5000,date:d(120),status:'success',category:'transfer' },
      { id:'TXN009',type:'sent',name:'Swiggy',amount:387,date:d(120),status:'failed',category:'bill' },
      { id:'TXN010',type:'sent',name:'Airtel DTH',amount:450,date:d(168),status:'success',category:'recharge' },
    ],
    rewards: {
      totalCashback:342,
      scratchCards:[{id:1,revealed:false,amount:25,label:'Cashback'},{id:2,revealed:false,amount:50,label:'Cashback'},{id:3,revealed:true,amount:10,label:'Cashback'}],
      offers:[
        {id:1,title:'Flat ₹50 cashback',desc:'On electricity bill above ₹500',icon:'⚡',color:'#fef3c7',badge:'NEW',badgeColor:'#f59e0b'},
        {id:2,title:'Up to ₹200 off',desc:'On first mutual fund investment',icon:'📈',color:'#dbeafe',badge:'HOT',badgeColor:'#3b82f6'},
        {id:3,title:'5% cashback',desc:'On mobile recharge above ₹199',icon:'📱',color:'#d1fae5',badge:'',badgeColor:''},
        {id:4,title:'Scratch & win',desc:'Complete 3 transactions to unlock',icon:'🎁',color:'#ede9fe',badge:'WIN',badgeColor:'#7c3aed'},
      ]
    },
    balanceVisible:false, notificationCount:3,
  };
}

class Store {
  constructor() { this.data = this.load(); }
  load() { try { const r=localStorage.getItem(STORE_KEY); if(r) return JSON.parse(r); } catch(e){} const d=defaults(); this.save(d); return d; }
  save(data) { if(data) this.data=data; localStorage.setItem(STORE_KEY,JSON.stringify(this.data)); }
  get(key) { return this.data[key]; }
  set(key,value) { this.data[key]=value; this.save(); }
  getUser() { return this.data.user; }
  getContacts() { return this.data.contacts; }
  getTransactions() { return this.data.transactions; }
  getRewards() { return this.data.rewards; }
  addTransaction(txn) {
    txn.id='TXN'+Date.now(); txn.date=new Date().toISOString();
    this.data.transactions.unshift(txn);
    if(txn.type==='sent'&&txn.status==='success') { const p=this.data.user.bankAccounts.find(a=>a.isPrimary); if(p) p.balance-=txn.amount; }
    this.save(); return txn;
  }
  toggleBalance() { this.data.balanceVisible=!this.data.balanceVisible; this.save(); }
  revealScratchCard(id) { const c=this.data.rewards.scratchCards.find(c=>c.id===id); if(c){c.revealed=true;this.data.rewards.totalCashback+=c.amount;this.save();} return c; }
  reset() { localStorage.removeItem(STORE_KEY); this.data=defaults(); this.save(); }
}
export const store = new Store();
