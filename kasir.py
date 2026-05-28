print("=== KASIR KASSA 2 ===")

nama_barang = input("baju polo: ")
harga = int(input("360000: "))
jumlah = int(input("450000: "))

total = harga * jumlah

print("Total harga:", total)

bayar = int(input("Uang bayar: "))
kembalian = bayar - total

print("Kembalian:", kembalian)
print("=== TERIMA KASIH ===")
