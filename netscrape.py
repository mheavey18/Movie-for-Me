from bs4 import BeautifulSoup as soup
from urllib2 import urlopen

myurl = 'https://www.netflix.com/originals'

uclient = urlopen(myurl)
page_html = uclient.read()
uclient.close()
page_soup = soup(page_html, "html.parser")
items = page_soup.findAll("div", {"class": "original-title-container"})


