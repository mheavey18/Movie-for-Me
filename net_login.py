from selenium import webdriver
from bs4 import BeautifulSoup as soup

browser = webdriver.Chrome('/Users/martyheavey/Downloads/chromedriver')
browser.get('https://www.netflix.com/browse')

login_email = browser.find_element_by_css_selector('#email')
login_pass = browser.find_element_by_css_selector('#password')
submit = browser.find_element_by_css_selector('#appMountPoint > div > div.login-body > div > div > form:nth-child(2) > button')

login_email.send_keys('your email@cox.net')
login_pass.send_keys('your pass')
submit.click()

marty_user = browser.find_element_by_css_selector('#appMountPoint > div > div > div.profiles-gate-container > div > div > ul > li:nth-child(3) > div > a > div > div')
marty_user.click()

html = browser.page_source

page_soup = soup(html, "html.parser")

# this is not working
items = page_soup.findAll("div", {"class": "slider-item"})

print items[0]
