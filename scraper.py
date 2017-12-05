from bs4 import BeautifulSoup as soup
from urllib2 import urlopen

myurl = 'https://www.newegg.com/Headphones/Category/ID-158?cm_sp=Tab_Electronics_5-_-VisNav-_-Headphones_1'

uclient = urlopen(myurl)
page_html = uclient.read()
uclient.close()
page_soup = soup(page_html, "html.parser")
items = page_soup.findAll("div", {"class": "item-container"})
print len(items)
