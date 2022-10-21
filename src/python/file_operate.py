from ast import Pass
from utils import *

class FileOperate(object):
    def __init__(self, path):
        self.path = path
        self.inverted_index_table = {}
        self.search_atom = {'exp_search': '', 'exp_regex':[], 'exp_kv_range':'', 'res_kv':{}, 'res_lines': []}

        with open(path, 'r') as file:
            self.lines = file.readlines()
            self.generate_inverted_index_table()
    
    def generate_inverted_index_table(self):
        for index, line in enumerate(self.lines):
            for word in set(clean_special_symbols(line,' ').split(' ')):
                if len(word) > 0:
                    if not word[0].isdigit():
                        if (word not in self.inverted_index_table):
                            self.inverted_index_table[word] = [index]
                        else:
                            self.inverted_index_table[word].append(index)

    def search(self, search_atom):
        self.search_atom = search_atom
        self.retrieval_inverted_index_table(search_atom['exp_search'])

        if len(search_atom['exp_regex']) > 0:
            self.extract_kv()

        if search_atom['exp_kv_range'] != '':
            self.filter_kv_range()

    def retrieval_inverted_index_table(self):
        pass

    def extract_kv(self):
        pass

    def filter_kv_range(self):
        pass

    def delete_search_atom(self):
        pass
