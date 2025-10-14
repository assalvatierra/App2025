import { Component, ViewChild, HostListener, ElementRef } from '@angular/core';
//import { FormBuilder, Validators } from '@angular/forms';
import { ApiAgentchatService } from '../../core/services/api-agentchat.service';

@Component({
  selector: 'app-agent-chat',
  templateUrl: './agent-chat.component.html',
  styleUrl: './agent-chat.component.css',
  standalone: false
})
export class AgentChatComponent {
  @ViewChild('chatArea') chatArea!: ElementRef<HTMLTextAreaElement>;

  AgentId: number = 1; 
  ChatMessage: string = '';
  chatRows = 10; 
  userChatRows = 2; 
  userChatMessage: string = '';

  HistoryCountToKeep: number = 5; // Number of chat history messages to keep  
  chatHistory: any[] = [];

  constructor(private apiAgentchatService: ApiAgentchatService) {
    this.updateChatRows();

    this.AgentId = 5;
  }

  @HostListener('window:resize')
  onResize() {
    this.updateChatRows();
  }

  private updateChatRows() {
    // Adjust the number of rows based on window height
    const height = window.innerHeight;
    // Estimate: each row ~24px, card header+actions+padding ~200px
    const available = Math.max(height - 400, 100);
    this.chatRows = Math.max(3, Math.floor(available / 24));
  }

  
  onKeydownEnter(event: any): void {
    this.onClickSubmitMessage();

    if (event) {
      event.preventDefault();
    }

  }

  onClickSubmitMessage(): void {
    var chatInfo = this.prepareUserChatInfo();
    this.processUserMessage(chatInfo);
  }


  onClickClearMessage(): void {
    this.userChatMessage = '';
    this.chatHistory = [];
    this.ChatMessage = '';
  }

  prepareUserChatInfo(): any {
    const chatInfo = {
      AgentId: this.AgentId,
      messageRequest: this.userChatMessage,
      messageReply: '',
      messageHistory: this.getLatestChatHistory(),
    };

    return chatInfo;
  }

  getLatestChatHistory(): string {
    // Return the last N messages from chatHistory, where N is HistoryCountToKeep
    const start = Math.max(0, this.chatHistory.length - this.HistoryCountToKeep);
    return this.chatHistory.slice(start).join('\n\n');
  }

  processUserMessage(chatInfo: any): void {
    this.userChatMessage = '';
    this.chatHistory.push('User >> ' + chatInfo.messageRequest);

    this.ChatMessage = this.chatHistory.join('\n\n') + '\n\n\nProcessing...';

    this.apiAgentchatService.ProcessMessage(chatInfo).subscribe(response => {
      this.processAgentResponse(response);
    }, error => {
      this.processErrorResponse();
    });

  }

  processAgentResponse(response: any): void {
    this.chatHistory.push('Agent>> ' + response.messageReply); 
    this.ChatMessage = this.chatHistory.join('\n\n');
    this.scrollToBottom();
  }
  processErrorResponse(): void {
    this.chatHistory.push('Error encountered!!!');
    this.ChatMessage = this.chatHistory.join('\n\n');
    this.scrollToBottom();
  }
  scrollToBottom() {
    setTimeout(() => {
      if (this.chatArea && this.chatArea.nativeElement) {
        this.chatArea.nativeElement.scrollTop = this.chatArea.nativeElement.scrollHeight;
      }
    },0);
  }
}
