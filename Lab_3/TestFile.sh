#!/bin/sh

file=$1

if [[ -f $file ]]
then
    echo "This file exists on your filesystem."
fi
if [[ ! -f $file ]]
then
    echo "file does not exist on your filesystem."
fi

count_lines(){
    echo "The number of lines in this file is: "
    awk 'END{print NR}' $file
}

count_words(){
    read -p "Enter a word to find: " word 
    grep -o $word $file | wc -l
}

add_text(){ 
    read -p "Enter a sentence to append: " line 
    echo -e $line >> $file   
}

copy_and_exit(){
    echo "copy_and_exit."
    mkdir solution
    cd solution
    touch newfile.txt
    cp lab_3/sample_text.txt newfile.txt
    #create a folder 
    #go to the folder 
    #create a file using touch command
    #come back to current folder
    #copy content to the new file in the other folder
    echo "PRESS n TO EXIT NOW"
    exitPrompt
}

exitPrompt(){
    read -p "Do you wish to continue? [y]es or [n]o: " ans
    if [ $ans == 'n' ]
    then
        echo "Exiting the script. Have a nice day!"
        break
    else
        menu
    fi
}
while(true)
    do
    menu(){
        clear
        printf "Choose from the following functions: \n"
        printf "[a]count_lines()\n[b]count_words()\n[c]add_text()\n[d]copy_and_exit()\n"
        printf "################################\n"
        read -p "Your choice: " choice

        case $choice in
        [aA])
            count_lines
        ;;

        [bB])
            count_words
        ;;

        [cC])
            add_text
        ;;

        [dD])
            copy_and_exit
        ;;

        *)
            echo "wrong choice!"
        esac
    }
    exitPrompt
done

echo "End of Program."

#Helpful resources I used: in-class examples  https://canvas.colorado.edu/courses/70610/files/28584067?module_item_id=2700778