try: 
    with open('file_does_not_exist.txt', 'r') as file:
        print(file.read())
except FileNotFoundError as FE:
    print("The file could not be found")
except Exception as e:
    print("Exception:", e)
