import json
def read(mydb):
    sql = """select * from foods  """
    cursor = mydb.cursor(dictionary = True)
    cursor.execute(sql)
    results = json.dumps(cursor.fetchone())
    cursor.close()
    return results


