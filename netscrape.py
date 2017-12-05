from bs4 import BeautifulSoup as soup
from urllib2 import urlopen

myurl = 'https://www.netflix.com/originals'


uclient = urlopen(myurl)
page_html = uclient.read()
uclient.close()
page_soup = soup(page_html, "html.parser")
items = page_soup.findAll("div", {"class": "original-title"})
# item = items[0].text
for item in items:
	print item.text
	
for item in items:
	title = item.a.div["original-title"]
	print title



