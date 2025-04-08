import { useState, useEffect } from "react";
import "./JSBillSplitter.css";

const JSBillSplitter = () => {
  const [amount, setAmount] = useState("");
  const [finalAmount, setFinalAmount] = useState(0);
  const [splitEnabled, setSplitEnabled] = useState(false);
  const [friends, setFriends] = useState([]);
  const [splitAmount, setSplitAmount] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(e.target.value);

    if (!isNaN(value)) {
      setShowBreakdown(true);
      const discount = value * 0.25;
      const cashback = 75;
      const result = value - discount - cashback;
      const final = result > 0 ? result.toFixed(2) : 0;
      setFinalAmount(final);

      // Split calculation
      const totalPeople = friends.length + 1; // Including you
      if (splitEnabled && totalPeople > 0) {
        setSplitAmount((final / totalPeople).toFixed(2));
      } else {
        setSplitAmount(0);
      }
    } else {
      setShowBreakdown(false);
      setFinalAmount(0);
      setSplitAmount(0);
    }
  };

  useEffect(() => {
    if (splitEnabled && finalAmount > 0) {
      const totalPeople = friends.length + 1;
      setSplitAmount((finalAmount / totalPeople).toFixed(2));
    }
  }, [friends, finalAmount, splitEnabled]);

  return (
    <div className="jsTopOuter">
      <div className="payingbill">
        <h6>Paying Bill</h6>
        <h3>Lion's Den</h3>
        <span>Southern Avenue, Kolkata</span>

        <div className="price">
          <input
            type="number"
            placeholder="₹"
            value={amount}
            onChange={handleAmountChange}
          />
          <span>Enter total amount as shown on the bill</span>
        </div>
      </div>
      <div className="discount">
        <div className="dstop">
          <div className="left">
            <h6>Flat discount</h6>
            <div className="offsection">
              <img src="flat-icon.png" alt="" />
              <div className="text">
                <h5>Flat 25% off</h5>
                <span>on total bill</span>
              </div>
            </div>
          </div>
          <div className="middle">
            <div className="plusicon"> + </div>
          </div>
          <div className="right">
            <h6>Payment Partner</h6>
            <div className="slider">
              <div className="slides">
                <img src="mobikwik-icon.png" alt="" />
                <div className="text">
                  <h5>Cashback ₹75</h5>
                  <span>use MBKUPIGIRF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dsbot">
          <p>+ Up to extra 10% off with payment partner offers</p>
        </div>
      </div>

      <div className="showresult pb-0">
        <h4>Total amount to be paid:</h4>
        <h3>
          ₹<span>{finalAmount}</span>
        </h3>
        <span>After applying offers</span>
      </div>

      {showBreakdown && (
        <div
          className={`price-breakdown ${
            showBreakdown ? "fade-in" : "fade-out"
          }`}
        >
          <h5>Price Breakdown</h5>
          <ul>
            <li>
              <span>Original Amount:</span>
              <span>₹{parseFloat(amount).toFixed(2)}</span>
            </li>
            <li>
              <span>25% Discount:</span>
              <span>- ₹{(parseFloat(amount) * 0.25).toFixed(2)}</span>
            </li>
            <li>
              <span>Cashback:</span>
              <span>- ₹75.00</span>
            </li>
            <li className="final">
              <span>Final Payable:</span>
              <span>₹{finalAmount}</span>
            </li>
          </ul>
        </div>
      )}

      <div className="splitwithfriends">
        <label>
          <input
            type="checkbox"
            checked={splitEnabled}
            onChange={(e) => {
              setSplitEnabled(e.target.checked);
              if (!e.target.checked) {
                setFriends([]);
                setSplitAmount(0);
              }
            }}
          />
          Split With Friends?
        </label>
        <small className="split-info-note">
          *Value will be calculated including you
        </small>
      </div>
      {splitEnabled && (
        <div className="splitwithfriends-ifyes">
          <div className="friendwrapper">
            <div className="friends">
              <input
                className="pointer-none"
                type="text"
                value="( You )"
                readonly
              />
            </div>
            {friends.map((friend, index) => (
              <div className="friends" key={index}>
                <input
                  type="text"
                  placeholder="Friend's Name"
                  value={friend}
                  onChange={(e) => {
                    const updatedFriends = [...friends];
                    updatedFriends[index] = e.target.value;
                    setFriends(updatedFriends);
                  }}
                />
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => {
                    const updatedFriends = [...friends];
                    updatedFriends.splice(index, 1);
                    setFriends(updatedFriends);
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div className="addfriend">
            <button
              type="button"
              onClick={() => {
                setFriends([...friends, ""]);
              }}
            >
              Add Friends
            </button>
          </div>
        </div>
      )}

      {splitEnabled && (
        <div className="showresult pb-0">
          <div className="showresult-split">
            <h4>Total amount for each person:</h4>
            <h3>
              ₹<span>{splitAmount}</span>
            </h3>
          </div>
        </div>
      )}

      <button
        className="apply"
        disabled={
          !amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0
        }
      >
        Apply offers & pay
      </button>
    </div>
  );
};

export default JSBillSplitter;
