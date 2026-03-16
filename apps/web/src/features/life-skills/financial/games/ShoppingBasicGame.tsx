import React, { useState } from 'react';

interface ShoppingBasicGameProps {
  onExit: () => void;
}

const products = [
  { name: 'Ekmek', price: 5, icon: '🍞' },
  { name: 'Süt', price: 8, icon: '🥛' },
  { name: 'Yumurta', price: 12, icon: '🥚' },
  { name: 'Meyve', price: 15, icon: '🍎' },
  { name: 'Sebze', price: 10, icon: '🥕' },
  { name: 'Peynir', price: 20, icon: '🧀' },
];

export default function ShoppingBasicGame({ onExit }: ShoppingBasicGameProps) {
  const [money, setMoney] = useState(50);
  const [cart, setCart] = useState<typeof products>([]);
  const [message, setMessage] = useState('');

  const addToCart = (product: (typeof products)[0]) => {
    const total = cart.reduce((sum, item) => sum + item.price, 0) + product.price;

    if (total <= money) {
      setCart([...cart, product]);
      setMessage(`✅ ${product.name} sepete eklendi!`);
    } else {
      setMessage('❌ Yeterli paran yok!');
    }

    setTimeout(() => setMessage(''), 1500);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const checkout = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    setMoney(money - total);
    setCart([]);
    setMessage(`🎉 Alışveriş tamamlandı! Kalan: ${money - total}₺`);
    setTimeout(() => setMessage(''), 2000);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-red-600/90 hover:bg-red-500/90 text-white rounded-xl font-bold transition-all"
          >
            ← Çıkış
          </button>
          <div className="px-6 py-3 bg-slate-800/80 rounded-xl">
            <span className="text-white font-black">💰 Paran: {money}₺</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black mb-4">🛒 Basit Alışveriş</h1>
          <p className="text-white/80 text-lg">Alışveriş yap ama paranı aşma!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-purple-500/30 p-6">
              <h2 className="text-2xl font-black text-white mb-4">🏪 Ürünler</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product, index) => (
                  <button
                    key={index}
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border-2 border-purple-500/30 rounded-2xl p-4 transition-all transform hover:scale-105"
                  >
                    <div className="text-5xl mb-2">{product.icon}</div>
                    <p className="text-white font-bold">{product.name}</p>
                    <p className="text-green-400 font-black text-xl">{product.price}₺</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-green-500/30 p-6">
            <h2 className="text-2xl font-black text-white mb-4">🛒 Sepetim</h2>

            {cart.length === 0 ? (
              <p className="text-white/60 text-center py-8">Sepet boş</p>
            ) : (
              <>
                <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-white/5 p-3 rounded-lg"
                    >
                      <span className="text-white">
                        {item.icon} {item.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 font-bold">{item.price}₺</span>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/20 pt-4 mb-4">
                  <div className="flex justify-between text-white font-black text-xl mb-2">
                    <span>Toplam:</span>
                    <span className="text-green-400">{cartTotal}₺</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Kalan:</span>
                    <span>{money - cartTotal}₺</span>
                  </div>
                </div>

                <button
                  onClick={checkout}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-black py-3 rounded-xl transition-all"
                >
                  Ödeme Yap
                </button>
              </>
            )}
          </div>
        </div>

        {message && (
          <div
            className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 text-xl font-black p-4 rounded-xl ${
              message.includes('✅') || message.includes('🎉')
                ? 'bg-green-500/90 text-white'
                : 'bg-red-500/90 text-white'
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
