#!/bin/bash

version=$(curl -s https://api.github.com/repos/txthinking/mr2/releases/latest | jq -r .tag_name)

curl -L https://github.com/txthinking/mr2/releases/download/$version/mr2 -o ./binary/mr2
chmod +x ./binary/mr2

curl -L https://github.com/txthinking/mr2/releases/download/$version/mr2_darwin_amd64 -o ./binary/mr2_darwin_amd64
chmod +x ./binary/mr2_darwin_amd64

curl -L https://github.com/txthinking/mr2/releases/download/$version/mr2_windows_amd64.exe -o ./binary/mr2_windows_amd64.exe
chmod +x ./binary/mr2_windows_amd64.exe
