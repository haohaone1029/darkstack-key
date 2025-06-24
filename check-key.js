async function checkKey() {
  const input = document.getElementById("keyInput").value.trim();
  const result = document.getElementById("result");

  if (!input) return (result.innerText = "Vui lòng nhập key!");

  const [key1s, key7s, adminKeys] = await Promise.all([
    fetch("key1s.txt").then(r => r.text()),
    fetch("key7s.txt").then(r => r.text()),
    fetch("admin_keys.txt").then(r => r.text())
  ]);

  if (adminKeys.includes(input)) {
    result.innerText = "✅ Key ADMIN hợp lệ - không giới hạn thời gian.";
  } else if (key7s.includes(input)) {
    result.innerText = "✅ Key VIP (7 ngày) hợp lệ.";
  } else if (key1s.includes(input)) {
    result.innerText = "✅ Key thường (1 ngày) hợp lệ.";
  } else {
    result.innerText = "❌ Key không hợp lệ hoặc đã hết hạn.";
  }
}